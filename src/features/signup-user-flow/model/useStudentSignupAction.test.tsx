import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { getApiErrorMessage } from "@/shared/api";
import { useSignupMutation } from "../api/useSignupMutation";
import { completeLogin } from "../lib/auth";
import { useStudentSignupAction } from "./useStudentSignupAction";

jest.mock("@/shared/api", () => ({
	getApiErrorMessage: jest.fn(),
	StudentTokenAuthPayloadDTOUniversity: { SSU: "SSU" },
}));

jest.mock("../api/useSignupMutation", () => ({ useSignupMutation: jest.fn() }));
jest.mock("../lib/auth", () => ({ completeLogin: jest.fn() }));

const mutateAsync = jest.fn();
const onSuccess = jest.fn();
const onFailure = jest.fn();

function renderStudentSignup(
	studentAuthPayload: { sIdno: string; sToken: string } | null = {
		sIdno: "20231234",
		sToken: "token",
	},
) {
	jest.mocked(useSignupMutation).mockReturnValue({
		mutateAsync,
	} as unknown as ReturnType<typeof useSignupMutation>);
	return renderHook(() =>
		useStudentSignupAction({
			studentAuthPayload,
			agreePrivacy: true,
			agreeMarketing: false,
			onSuccess,
			onFailure,
		}),
	);
}

describe("useStudentSignupAction 학생 회원가입", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("LMS 인증 정보가 없으면 가입 요청을 차단한다", async () => {
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderStudentSignup(null);

		await act(async () => {
			await result.current.signup();
		});

		expect(alert).toHaveBeenCalledWith(
			"인증 필요",
			"먼저 LMS 인증을 진행해주세요.",
		);
		expect(mutateAsync).not.toHaveBeenCalled();
	});

	it("LMS 인증과 동의 정보로 가입한 뒤 세션을 완료하고 다음 단계로 이동한다", async () => {
		mutateAsync.mockResolvedValue({
			isSuccess: true,
			result: {
				tokens: { accessToken: "access", refreshToken: "refresh" },
				role: "STUDENT",
				memberId: 7,
			},
		});
		const { result } = renderStudentSignup();

		await act(async () => {
			await result.current.signup();
		});

		expect(mutateAsync).toHaveBeenCalledWith({
			locationAgree: true,
			marketingAgree: false,
			studentTokenAuth: {
				sIdno: "20231234",
				sToken: "token",
				university: "SSU",
			},
		});
		expect(completeLogin).toHaveBeenCalledWith(
			{ accessToken: "access", refreshToken: "refresh" },
			"STUDENT",
			undefined,
			7,
		);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it("가입 실패 시 서버 메시지를 안내하고 확인 후 실패 단계로 돌아간다", async () => {
		mutateAsync.mockRejectedValue(new Error("duplicate"));
		jest
			.mocked(getApiErrorMessage)
			.mockReturnValue("이미 존재하는 계정입니다.");
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderStudentSignup();

		await act(async () => {
			await result.current.signup();
		});

		const actions = alert.mock.calls[0]?.[2];
		expect(alert).toHaveBeenCalledWith(
			"회원가입 실패",
			"이미 존재하는 계정입니다.",
			expect.any(Array),
		);
		expect(actions?.[0]?.onPress).toBeDefined();
		actions?.[0]?.onPress?.();
		expect(onFailure).toHaveBeenCalledTimes(1);
	});
});
