import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";
import { router } from "expo-router";
import { Alert } from "react-native";
import {
	type GroupCertificationSession,
	type PartnershipBenefit,
	usePartnershipAuthStore,
} from "@/features/partnership-auth";
import { apiInstance } from "@/shared/api/instance";
import { trackEvent } from "@/shared/lib/analytics/trackEvent";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { PartnershipVerificationPage } from "./PartnershipVerificationPage";

jest.mock("expo-router", () => ({
	router: { replace: jest.fn(), back: jest.fn() },
}));

jest.mock("react-native-keyboard-controller", () => {
	const { ScrollView } = require("react-native");
	return { KeyboardAwareScrollView: ScrollView };
});

// Animated.loop 무한 반복이 테스트를 끝나지 않게 하므로 이 화면의 공지 마키는 비워 둔다.
jest.mock("./InfiniteNoticeMarquee", () => ({
	InfiniteNoticeMarquee: () => null,
}));

jest.mock("@/shared/lib/analytics/trackEvent", () => ({
	trackEvent: jest.fn(),
}));

jest.mock("@/entities/user/api/useProfileImageQuery", () => ({
	useProfileImageQuery: () => ({ data: undefined }),
}));

jest.mock("@/entities/user/api/useStudentProfileQuery", () => ({
	useStudentProfileQuery: () => ({ data: undefined }),
}));

jest.mock("@/entities/user/model/useUserBasicInfo", () => ({
	useUserBasicInfo: () => null,
}));

const mockApi = new MockAdapter(apiInstance);

const INDIVIDUAL_BENEFIT: PartnershipBenefit = {
	id: 1,
	adminId: 10,
	manager: "IT대학 학생회",
	contents: "음료 1잔 무료",
	goods: [],
	people: 1,
	cost: null,
	type: "INDIVIDUAL",
};

const GROUP_BENEFIT: PartnershipBenefit = {
	...INDIVIDUAL_BENEFIT,
	id: 2,
	adminId: 11,
	manager: "총학생회",
	contents: "4인 이상 10% 할인",
	people: 4,
	type: "GROUP",
};

function givenVerifiedStore(
	benefit: PartnershipBenefit,
	groupSession: GroupCertificationSession | null = null,
): void {
	usePartnershipAuthStore.setState({
		store: { storeId: 7, storeName: "숭실 분식", benefits: [benefit] },
		selectedBenefit: benefit,
		groupSession,
		analyticsContext: { entryPoint: "scanner_button", authMethod: "qr" },
	});
}

function groupSession(
	count: number,
	role: GroupCertificationSession["role"],
): GroupCertificationSession {
	return {
		sessionId: 321,
		requiredPeople: 4,
		count,
		status: count >= 4 ? "COMPLETED" : "WAITING",
		userIds: [],
		role,
	};
}

describe("PartnershipVerificationPage 이용 완료 GA 기록", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockApi.reset();
		jest.spyOn(Alert, "alert").mockImplementation(() => {});
		usePartnershipAuthStore.getState().reset();
	});

	it("개인 인증을 완료하면 사용 내역 기록 성공 후 이용 완료를 기록한다", async () => {
		// Given
		givenVerifiedStore(INDIVIDUAL_BENEFIT);
		mockApi.onPost("/partnership/usage").reply(200, { isSuccess: true });
		renderWithProviders(<PartnershipVerificationPage />);

		// When
		fireEvent.press(screen.getByText("인증 완료"));

		// Then
		await waitFor(() =>
			expect(trackEvent).toHaveBeenCalledWith("partnership_usage_completed", {
				store_id: 7,
				content_id: 1,
				benefit_type: "individual",
				auth_method: "qr",
			}),
		);
		expect(router.replace).toHaveBeenCalled();
	});

	it("단체 대표자가 일부만 앱으로 인증된 상태에서 완료하면 인원 구성을 함께 기록한다", async () => {
		// Given
		givenVerifiedStore(GROUP_BENEFIT, groupSession(2, "REPRESENTATIVE"));
		mockApi.onPost("/partnership/usage").reply(200, { isSuccess: true });
		renderWithProviders(<PartnershipVerificationPage />);

		// When
		fireEvent.press(screen.getByText("인증 완료"));

		// Then
		await waitFor(() =>
			expect(trackEvent).toHaveBeenCalledWith("partnership_usage_completed", {
				store_id: 7,
				content_id: 2,
				benefit_type: "group",
				auth_method: "qr",
				group_size: 4,
				group_app_verified: 2,
				group_unverified: 2,
			}),
		);
	});

	it("단체 참여자는 사용 내역을 기록하지 않으므로 이용 완료도 기록하지 않는다", async () => {
		// Given
		givenVerifiedStore(GROUP_BENEFIT, groupSession(4, "PARTICIPANT"));
		renderWithProviders(<PartnershipVerificationPage />);

		// When
		fireEvent.press(screen.getByText("인증 완료"));

		// Then
		await waitFor(() => expect(router.replace).toHaveBeenCalled());
		expect(mockApi.history.post).toHaveLength(0);
		expect(trackEvent).not.toHaveBeenCalled();
	});

	it("사용 내역 기록이 실패하면 이용 완료 대신 실패를 기록한다", async () => {
		// Given
		givenVerifiedStore(INDIVIDUAL_BENEFIT);
		mockApi.onPost("/partnership/usage").reply(500);
		renderWithProviders(<PartnershipVerificationPage />);

		// When
		fireEvent.press(screen.getByText("인증 완료"));

		// Then
		await waitFor(() =>
			expect(trackEvent).toHaveBeenCalledWith("partnership_auth_failed", {
				fail_stage: "usage_record",
				fail_reason: "request_failed",
				store_id: 7,
				auth_method: "qr",
			}),
		);
		expect(trackEvent).not.toHaveBeenCalledWith(
			"partnership_usage_completed",
			expect.anything(),
		);
		expect(router.replace).not.toHaveBeenCalled();
	});
});
