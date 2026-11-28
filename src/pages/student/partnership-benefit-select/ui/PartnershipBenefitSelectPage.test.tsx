import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";
import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";
import { usePartnershipAuthStore } from "@/features/partnership-auth";
import { apiInstance } from "@/shared/api/instance";
import { trackEvent } from "@/shared/lib/analytics/trackEvent";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { PartnershipBenefitSelectPage } from "./PartnershipBenefitSelectPage";

jest.mock("expo-router", () => ({
	router: { push: jest.fn(), back: jest.fn() },
	useLocalSearchParams: jest.fn(),
}));

jest.mock("@/shared/lib/analytics/trackEvent", () => ({
	trackEvent: jest.fn(),
}));

jest.mock("react-native-keyboard-controller", () => {
	const { ScrollView } = require("react-native");
	return { KeyboardAwareScrollView: ScrollView };
});

const mockApi = new MockAdapter(apiInstance);

const STORE_PAPERS_RESPONSE = {
	isSuccess: true,
	result: {
		storeId: 7,
		storeName: "숭실 분식",
		partnershipContents: [
			{
				contentId: 1,
				adminId: 10,
				adminName: "IT대학 학생회",
				paperContent: "음료 1잔 무료",
				people: 1,
			},
			{
				contentId: 2,
				adminId: 11,
				adminName: "총학생회",
				paperContent: "4인 이상 10% 할인",
				people: 4,
			},
		],
	},
};

describe("PartnershipBenefitSelectPage 혜택 선택 후 개인/단체 인증 분기", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockApi.reset();
		usePartnershipAuthStore.getState().reset();
	});

	it("개인 혜택을 선택하면 개인 인증을 요청하고 인증 확인 화면으로 이동한다", async () => {
		// Given
		jest.mocked(useLocalSearchParams).mockReturnValue({ storeId: "7" });
		mockApi.onGet("/store/7/papers").reply(200, STORE_PAPERS_RESPONSE);
		mockApi.onPost("/certification/personal").reply(200, { isSuccess: true });
		renderWithProviders(<PartnershipBenefitSelectPage />);

		// When
		fireEvent.press(await screen.findByText("IT대학 학생회"));
		fireEvent.press(screen.getByText("선택 완료"));

		// Then
		await waitFor(() =>
			expect(router.push).toHaveBeenCalledWith(
				"/(protected)/student/partnership-verification",
			),
		);
		expect(JSON.parse(mockApi.history.post[0].data)).toMatchObject({
			storeId: 7,
			adminId: 10,
		});
		expect(trackEvent).toHaveBeenCalledWith("benefit_selected", {
			store_id: 7,
			content_id: 1,
			benefit_type: "individual",
			preselected: 0,
			auth_method: "direct",
		});
		expect(trackEvent).toHaveBeenCalledWith("partnership_auth_succeeded", {
			store_id: 7,
			content_id: 1,
			benefit_type: "individual",
			auth_method: "direct",
		});
	});

	it("스캐너에서 넘어온 진입 경로와 인증 방식을 이벤트와 스토어에 반영한다", async () => {
		// Given
		jest.mocked(useLocalSearchParams).mockReturnValue({
			storeId: "7",
			entryPoint: "scanner_button",
			authMethod: "number",
		});
		mockApi.onGet("/store/7/papers").reply(200, STORE_PAPERS_RESPONSE);
		mockApi.onPost("/certification/personal").reply(200, { isSuccess: true });
		renderWithProviders(<PartnershipBenefitSelectPage />);

		// When
		fireEvent.press(await screen.findByText("IT대학 학생회"));
		fireEvent.press(screen.getByText("선택 완료"));

		// Then
		await waitFor(() =>
			expect(trackEvent).toHaveBeenCalledWith(
				"partnership_auth_succeeded",
				expect.objectContaining({ auth_method: "number" }),
			),
		);
		expect(usePartnershipAuthStore.getState().analyticsContext).toEqual({
			entryPoint: "scanner_button",
			authMethod: "number",
		});
	});

	it("상세에서 미리 고른 혜택으로 들어오면 preselected를 1로 기록한다", async () => {
		// Given
		jest.mocked(useLocalSearchParams).mockReturnValue({
			storeId: "7",
			preSelectedContentId: "2",
			entryPoint: "store_detail",
		});
		mockApi.onGet("/store/7/papers").reply(200, STORE_PAPERS_RESPONSE);
		mockApi
			.onPost("/certification/session")
			.reply(200, { isSuccess: true, result: { sessionId: 321 } });
		renderWithProviders(<PartnershipBenefitSelectPage />);

		// When
		await screen.findByText("총학생회");
		await waitFor(() => expect(screen.getByText("선택 완료")).toBeEnabled());
		fireEvent.press(screen.getByText("선택 완료"));

		// Then
		await waitFor(() =>
			expect(trackEvent).toHaveBeenCalledWith("benefit_selected", {
				store_id: 7,
				content_id: 2,
				benefit_type: "group",
				preselected: 1,
				auth_method: "direct",
			}),
		);
	});

	it("혜택 목록을 불러오지 못하면 혜택 로드 실패를 기록한다", async () => {
		// Given
		jest.mocked(useLocalSearchParams).mockReturnValue({ storeId: "7" });
		mockApi.onGet("/store/7/papers").reply(500);

		// When
		renderWithProviders(<PartnershipBenefitSelectPage />);

		// Then
		await waitFor(() =>
			expect(trackEvent).toHaveBeenCalledWith("partnership_auth_failed", {
				fail_stage: "benefit_load",
				fail_reason: "request_failed",
				store_id: 7,
				auth_method: "direct",
			}),
		);
	});

	it("단체 혜택을 선택하면 인원 조건으로 세션을 만들고 대표자 QR 화면으로 이동한다", async () => {
		// Given
		jest.mocked(useLocalSearchParams).mockReturnValue({ storeId: "7" });
		mockApi.onGet("/store/7/papers").reply(200, STORE_PAPERS_RESPONSE);
		mockApi
			.onPost("/certification/session")
			.reply(200, { isSuccess: true, result: { sessionId: 321 } });
		renderWithProviders(<PartnershipBenefitSelectPage />);

		// When
		fireEvent.press(await screen.findByText("총학생회"));
		fireEvent.press(screen.getByText("선택 완료"));

		// Then
		await waitFor(() =>
			expect(router.push).toHaveBeenCalledWith(
				"/(protected)/student/partnership-group-certification",
			),
		);
		expect(JSON.parse(mockApi.history.post[0].data)).toMatchObject({
			people: 4,
			storeId: 7,
			adminId: 11,
		});
		expect(usePartnershipAuthStore.getState().groupSession).toMatchObject({
			sessionId: 321,
			requiredPeople: 4,
			count: 1,
			status: "WAITING",
			role: "REPRESENTATIVE",
		});
	});

	it("인증 요청이 실패하면 실패를 안내하고 다음 화면으로 이동하지 않는다", async () => {
		// Given
		jest.spyOn(Alert, "alert").mockImplementation(() => {});
		jest.mocked(useLocalSearchParams).mockReturnValue({ storeId: "7" });
		mockApi.onGet("/store/7/papers").reply(200, STORE_PAPERS_RESPONSE);
		mockApi.onPost("/certification/personal").reply(200, {
			isSuccess: false,
			message: "제휴 대상자가 아닙니다.",
		});
		renderWithProviders(<PartnershipBenefitSelectPage />);

		// When
		fireEvent.press(await screen.findByText("IT대학 학생회"));
		fireEvent.press(screen.getByText("선택 완료"));

		// Then
		await waitFor(() =>
			expect(Alert.alert).toHaveBeenCalledWith(
				"인증 실패",
				"제휴 인증을 시작하지 못했습니다.",
			),
		);
		expect(router.push).not.toHaveBeenCalled();
		expect(trackEvent).toHaveBeenCalledWith("partnership_auth_failed", {
			fail_stage: "benefit_certify",
			fail_reason: "request_failed",
			store_id: 7,
			auth_method: "direct",
		});
		expect(trackEvent).not.toHaveBeenCalledWith(
			"partnership_auth_succeeded",
			expect.anything(),
		);
	});
});
