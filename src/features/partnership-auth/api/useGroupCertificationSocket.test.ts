import type { IMessage } from "@stomp/stompjs";
import { act, renderHook } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";
import { useAuthStore } from "@/shared/lib/auth/authStore";
import { stompManager } from "@/shared/lib/stomp/stompManager";
import type { GroupCertificationQrPayload } from "../model/types";
import { usePartnershipAuthStore } from "../model/usePartnershipAuthStore";
import {
	buildGroupCertificationQrValue,
	parseGroupCertificationQr,
	useGroupCertificationProgress,
} from "./useGroupCertificationSocket";

jest.mock("expo-router", () => ({
	router: { dismissAll: jest.fn(), replace: jest.fn() },
}));

// 테스트 환경에는 expo-constants manifest가 없어 앱 빌드와 같은 형태의 URL만 만든다.
jest.mock("expo-linking", () => ({
	createURL: (
		path: string,
		{
			scheme,
			queryParams,
		}: { scheme: string; queryParams: Record<string, string> },
	) => `${scheme}://${path}?${new URLSearchParams(queryParams).toString()}`,
}));

jest.mock("@/shared/lib/stomp/stompManager", () => ({
	stompManager: { subscribeToTopic: jest.fn() },
}));

const QR_PAYLOAD: Omit<GroupCertificationQrPayload, "type" | "version"> = {
	adminId: 10,
	sessionId: 321,
	storeId: 7,
	storeName: "숭실 분식",
	contentId: 2,
	adminName: "총학생회",
	partnershipContent: "4인 이상 10% 할인",
	goods: ["떡볶이"],
	requiredPeople: 4,
};

function toJsonPayload(
	overrides: Partial<Record<keyof GroupCertificationQrPayload, unknown>> = {},
): string {
	return JSON.stringify({
		type: "ASSU_GROUP_CERTIFICATION",
		version: 1,
		...QR_PAYLOAD,
		...overrides,
	});
}

describe("단체 인증 QR 인식", () => {
	it("대표자가 만든 단체 인증 QR을 참여자가 그대로 읽을 수 있다", () => {
		// Given
		const qrValue = buildGroupCertificationQrValue(QR_PAYLOAD);

		// When
		const parsed = parseGroupCertificationQr(qrValue);

		// Then
		expect(parsed).toEqual({
			type: "ASSU_GROUP_CERTIFICATION",
			version: 1,
			...QR_PAYLOAD,
		});
	});

	it("딥링크가 아닌 JSON 형식의 단체 인증 QR도 읽는다", () => {
		expect(parseGroupCertificationQr(toJsonPayload())?.sessionId).toBe(321);
	});

	it.each([
		{
			label: "다른 앱 스킴",
			value: `other-app://student/partnership-group-participant?payload=${encodeURIComponent(toJsonPayload())}`,
		},
		{
			label: "다른 화면 경로",
			value: `assu-app://student/home?payload=${encodeURIComponent(toJsonPayload())}`,
		},
		{
			label: "payload가 없는 딥링크",
			value: "assu-app://student/partnership-group-participant",
		},
		{ label: "매장 번호만 있는 일반 제휴 QR", value: "12" },
		{ label: "깨진 JSON", value: '{"type":"ASSU_GROUP_CERTIFICATION"' },
	])("$label이면 단체 인증 QR로 인정하지 않는다", ({ value }) => {
		expect(parseGroupCertificationQr(value)).toBeNull();
	});

	it.each([
		{ label: "QR 타입이 다르면", overrides: { type: "OTHER" } },
		{ label: "지원하지 않는 버전이면", overrides: { version: 2 } },
		{ label: "인원 조건이 0명이면", overrides: { requiredPeople: 0 } },
		{ label: "세션 번호가 정수가 아니면", overrides: { sessionId: 1.5 } },
		{ label: "매장 번호가 문자열이면", overrides: { storeId: "7" } },
		{
			label: "상품 목록에 문자열이 아닌 값이 있으면",
			overrides: { goods: [1] },
		},
	])("$label 단체 인증을 시작하지 않는다", ({ overrides }) => {
		expect(parseGroupCertificationQr(toJsonPayload(overrides))).toBeNull();
	});
});

function givenLoggedInMember(memberId: number): void {
	useAuthStore.setState({ memberId });
}

function givenWaitingGroupSession(count: number): void {
	usePartnershipAuthStore.setState({
		groupSession: {
			sessionId: 321,
			requiredPeople: 4,
			count,
			status: "WAITING",
			userIds: [],
			role: "REPRESENTATIVE",
		},
	});
}

describe("useGroupCertificationProgress 진행 상태 구독", () => {
	let publishProgress: (body: string) => void;
	const mockUnsubscribe = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest
			.mocked(stompManager.subscribeToTopic)
			.mockImplementation((_topic, callback) => {
				publishProgress = (body) => callback({ body } as IMessage);
				return mockUnsubscribe;
			});
		jest.spyOn(Alert, "alert").mockImplementation(() => {});
		useAuthStore.setState({ memberId: null });
		usePartnershipAuthStore.getState().reset();
	});

	it("세션 번호의 진행 토픽을 구독하고 화면을 벗어나면 구독을 해제한다", () => {
		// Given & When
		const { unmount } = renderHook(() => useGroupCertificationProgress(321));
		unmount();

		// Then
		expect(stompManager.subscribeToTopic).toHaveBeenCalledWith(
			"/certification/progress/321",
			expect.any(Function),
		);
		expect(mockUnsubscribe).toHaveBeenCalled();
	});

	it("세션이 없으면 진행 토픽을 구독하지 않는다", () => {
		renderHook(() => useGroupCertificationProgress(null));

		expect(stompManager.subscribeToTopic).not.toHaveBeenCalled();
	});

	it("참여자가 인증하면 인증 인원 수를 갱신한다", () => {
		// Given
		givenWaitingGroupSession(1);
		renderHook(() => useGroupCertificationProgress(321));

		// When
		act(() => publishProgress(JSON.stringify({ type: "PROGRESS", count: 3 })));

		// Then
		expect(usePartnershipAuthStore.getState().groupSession).toMatchObject({
			count: 3,
			status: "WAITING",
		});
	});

	it("필요 인원이 모두 인증하면 세션을 완료 상태로 바꾸고 참여자를 기록한다", () => {
		// Given
		givenWaitingGroupSession(3);
		renderHook(() => useGroupCertificationProgress(321));

		// When
		act(() =>
			publishProgress(
				JSON.stringify({ type: "COMPLETED", count: 4, userIds: [1, 2, 3, 4] }),
			),
		);

		// Then
		expect(usePartnershipAuthStore.getState().groupSession).toMatchObject({
			count: 4,
			status: "COMPLETED",
			userIds: [1, 2, 3, 4],
		});
	});

	it("정상 인증 사용자 목록에 본인이 없으면 실패 안내 후 홈으로 돌아가고 인증 상태가 초기화된다", () => {
		// Given
		givenLoggedInMember(1);
		givenWaitingGroupSession(1);
		renderHook(() => useGroupCertificationProgress(321));

		// When
		act(() =>
			publishProgress(
				JSON.stringify({
					type: "MISMATCH",
					count: 2,
					message: "다른 학과 학생입니다.",
					userIds: [2, 3],
				}),
			),
		);
		const [title, message, buttons] = jest.mocked(Alert.alert).mock.calls[0];
		act(() => buttons?.[0].onPress?.());

		// Then
		expect(title).toBe("인증 실패");
		expect(message).toBe("다른 학과 학생입니다.");
		expect(router.replace).toHaveBeenCalledWith(
			"/(protected)/student/(tabs)/home",
		);
		expect(usePartnershipAuthStore.getState().groupSession).toBeNull();
	});

	it("정상 인증 사용자 목록에 본인이 있으면 실패 안내 없이 인원 수만 갱신한다", () => {
		// Given
		givenLoggedInMember(1);
		givenWaitingGroupSession(1);
		renderHook(() => useGroupCertificationProgress(321));

		// When
		act(() =>
			publishProgress(
				JSON.stringify({ type: "MISMATCH", count: 2, userIds: [1, 2] }),
			),
		);

		// Then
		expect(Alert.alert).not.toHaveBeenCalled();
		expect(usePartnershipAuthStore.getState().groupSession?.count).toBe(2);
	});

	it("불일치 메시지가 반복돼도 실패 안내는 한 번만 띄운다", () => {
		// Given
		givenLoggedInMember(1);
		givenWaitingGroupSession(1);
		renderHook(() => useGroupCertificationProgress(321));
		const mismatch = JSON.stringify({
			type: "MISMATCH",
			count: 2,
			userIds: [],
		});

		// When
		act(() => {
			publishProgress(mismatch);
			publishProgress(mismatch);
		});

		// Then
		expect(Alert.alert).toHaveBeenCalledTimes(1);
	});

	it("형식이 깨진 메시지는 무시하고 기존 진행 상태를 유지한다", () => {
		// Given
		givenWaitingGroupSession(1);
		renderHook(() => useGroupCertificationProgress(321));

		// When
		act(() => publishProgress("not-json"));

		// Then
		expect(usePartnershipAuthStore.getState().groupSession).toMatchObject({
			count: 1,
			status: "WAITING",
		});
	});
});
