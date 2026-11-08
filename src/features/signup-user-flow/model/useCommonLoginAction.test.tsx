import { act, renderHook } from "@testing-library/react-native";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { useLoginCommonMutation } from "../api/useLoginCommonMutation";
import { completeLogin } from "../lib/auth";
import { useCommonLoginAction } from "./useCommonLoginAction";

jest.mock("axios", () => ({ isAxiosError: jest.fn() }));

jest.mock("expo-router", () => ({
	router: { replace: jest.fn() },
}));

jest.mock("../api/useLoginCommonMutation", () => ({
	useLoginCommonMutation: jest.fn(),
}));

jest.mock("../lib/auth", () => ({
	completeLogin: jest.fn(),
}));

const mutateAsync = jest.fn();

function mockLoginMutation(isPending = false): void {
	jest.mocked(useLoginCommonMutation).mockReturnValue({
		mutateAsync,
		isPending,
	} as unknown as ReturnType<typeof useLoginCommonMutation>);
}

describe("useCommonLoginAction 공통 이메일 로그인", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockLoginMutation();
	});

	it("성공하면 로그인 정보를 저장하고 returnTo 경로로 이동한다", async () => {
		mutateAsync.mockResolvedValue({
			isSuccess: true,
			result: {
				tokens: { accessToken: "access", refreshToken: "refresh" },
				role: "ADMIN",
				basicInfo: { name: "관리자" },
				memberId: 1,
			},
		});
		jest.mocked(completeLogin).mockResolvedValue("/verify?storeId=12");
		const { result } = renderHook(() =>
			useCommonLoginAction({
				email: "admin@assu.com",
				password: "password",
				returnTo: "/verify?storeId=12",
			}),
		);

		await act(async () => {
			await result.current.handlePressLogin();
		});

		expect(mutateAsync).toHaveBeenCalledWith({
			email: "admin@assu.com",
			password: "password",
		});
		expect(completeLogin).toHaveBeenCalledWith(
			{ accessToken: "access", refreshToken: "refresh" },
			"ADMIN",
			{ name: "관리자" },
			1,
			"/verify?storeId=12",
		);
		expect(router.replace).toHaveBeenCalledWith("/verify?storeId=12");
	});

	it("승인 대기 응답이면 승인 안내만 표시하고 이동하지 않는다", async () => {
		const error = {
			response: { status: 403, data: { code: "MEMBER_4017" } },
		};
		mutateAsync.mockRejectedValue(error);
		jest.mocked(isAxiosError).mockReturnValue(true);
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderHook(() =>
			useCommonLoginAction({ email: "partner@assu.com", password: "password" }),
		);

		await act(async () => {
			await result.current.handlePressLogin();
		});

		expect(alert).toHaveBeenCalledWith(
			"가입 승인 대기 중",
			"가입 승인 대기 중입니다. 백오피스 승인 후 로그인할 수 있습니다.",
		);
		expect(router.replace).not.toHaveBeenCalled();
	});

	it("일반 로그인 실패면 실패 안내를 표시하고 이동하지 않는다", async () => {
		mutateAsync.mockRejectedValue(new Error("network failure"));
		jest.mocked(isAxiosError).mockReturnValue(false);
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderHook(() =>
			useCommonLoginAction({ email: "admin@assu.com", password: "password" }),
		);

		await act(async () => {
			await result.current.handlePressLogin();
		});

		expect(alert).toHaveBeenCalledWith("로그인 실패", "로그인에 실패했습니다.");
		expect(router.replace).not.toHaveBeenCalled();
	});

	it("mutation의 진행 상태를 로그인 버튼 상태에 전달한다", () => {
		mockLoginMutation(true);

		const { result } = renderHook(() =>
			useCommonLoginAction({ email: "admin@assu.com", password: "password" }),
		);

		expect(result.current.isPending).toBe(true);
	});
});
