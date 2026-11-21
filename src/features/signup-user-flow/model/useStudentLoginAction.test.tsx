import { act, renderHook } from "@testing-library/react-native";
import { AxiosError, type AxiosResponse } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { useLoginStudentMutation } from "../api/useLoginStudentMutation";
import { completeLogin } from "../lib/auth";
import { useStudentLoginAction } from "./useStudentLoginAction";

jest.mock("expo-router", () => ({ router: { replace: jest.fn() } }));
jest.mock("@/shared/config/env", () => ({
	ENV: {
		SSU_TEST_SIDNO: "",
		SSU_TEST_STOKEN: "",
		SSU_LOGIN_URL: "https://lms.example",
	},
}));
jest.mock("../api/useLoginStudentMutation", () => ({
	useLoginStudentMutation: jest.fn(),
}));
jest.mock("../lib/auth", () => ({ completeLogin: jest.fn() }));

const mutateAsync = jest.fn();

function renderStudentLogin(onSignupRequired = jest.fn()) {
	jest.mocked(useLoginStudentMutation).mockReturnValue({
		mutateAsync,
	} as unknown as ReturnType<typeof useLoginStudentMutation>);
	return {
		onSignupRequired,
		...renderHook(() =>
			useStudentLoginAction("/verify?storeId=12", onSignupRequired),
		),
	};
}

describe("useStudentLoginAction LMS 로그인", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("LMS 인증 성공 정보로 학생 로그인 후 원래 인증 화면으로 이동한다", async () => {
		mutateAsync.mockResolvedValue({
			isSuccess: true,
			result: {
				tokens: { accessToken: "access", refreshToken: "refresh" },
				role: "STUDENT",
				memberId: 7,
			},
		});
		jest.mocked(completeLogin).mockResolvedValue("/verify?storeId=12");
		const { result } = renderStudentLogin();

		await act(async () => {
			await result.current.loginWebView.onVerifySuccess({
				sIdno: "20231234",
				sToken: "lms-token",
			});
		});

		expect(mutateAsync).toHaveBeenCalledWith({
			sIdno: "20231234",
			sToken: "lms-token",
			university: "SSU",
		});
		expect(completeLogin).toHaveBeenCalledWith(
			{ accessToken: "access", refreshToken: "refresh" },
			"STUDENT",
			undefined,
			7,
			"/verify?storeId=12",
		);
		expect(router.replace).toHaveBeenCalledWith("/verify?storeId=12");
	});

	it("LMS 로그인 실패 시 실패 안내를 표시하고 이동하지 않는다", async () => {
		mutateAsync.mockRejectedValue(new Error("invalid token"));
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderStudentLogin();

		await act(async () => {
			await result.current.loginWebView.onVerifySuccess({
				sIdno: "20231234",
				sToken: "invalid",
			});
		});

		expect(alert).toHaveBeenCalledWith("로그인 실패", "로그인에 실패했습니다.");
		expect(router.replace).not.toHaveBeenCalled();
	});

	it("미가입 학생은 회원가입 단계로 이동한다", async () => {
		const response = {
			status: 404,
			data: { code: "MEMBER_4001", message: "회원 가입 필요" },
		} as AxiosResponse;
		mutateAsync.mockRejectedValue(
			new AxiosError(
				"Request failed with status code 404",
				undefined,
				undefined,
				undefined,
				response,
			),
		);
		const alert = jest.spyOn(Alert, "alert");
		const { result, onSignupRequired } = renderStudentLogin();

		await act(async () => {
			await result.current.loginWebView.onVerifySuccess({
				sIdno: "20231234",
				sToken: "lms-token",
			});
		});

		expect(onSignupRequired).toHaveBeenCalledTimes(1);
		expect(alert).not.toHaveBeenCalled();
		expect(router.replace).not.toHaveBeenCalled();
	});
});
