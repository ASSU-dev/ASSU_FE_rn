import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { getApiErrorMessage } from "@/shared/api";
import { useSignupPartnerMutation } from "../api/useSignupPartnerMutation";
import { toPartnerSignupBody } from "./signupPayloadAdapters";
import { usePartnerSignupAction } from "./usePartnerSignupAction";

jest.mock("@/shared/api", () => ({ getApiErrorMessage: jest.fn() }));
jest.mock("../api/useSignupPartnerMutation", () => ({
	useSignupPartnerMutation: jest.fn(),
}));
jest.mock("./signupPayloadAdapters", () => ({
	toPartnerSignupBody: jest.fn(),
}));

const mutateAsync = jest.fn();
const onSuccess = jest.fn();
const onFailure = jest.fn();
const form = {} as Parameters<typeof usePartnerSignupAction>[0]["form"];

describe("usePartnerSignupAction 제휴업체 회원가입", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useSignupPartnerMutation).mockReturnValue({
			mutateAsync,
		} as unknown as ReturnType<typeof useSignupPartnerMutation>);
	});

	it("변환된 가입 요청과 사업자 등록증을 전송하고 성공 단계를 연다", async () => {
		const body = { request: { phoneNumber: "01012345678" }, licenseImage: {} };
		jest
			.mocked(toPartnerSignupBody)
			.mockReturnValue(body as ReturnType<typeof toPartnerSignupBody>);
		mutateAsync.mockResolvedValue({ isSuccess: true });
		const { result } = renderHook(() =>
			usePartnerSignupAction({ form, onSuccess, onFailure }),
		);

		await act(async () => {
			await result.current.signup();
		});

		expect(toPartnerSignupBody).toHaveBeenCalledWith(form);
		expect(mutateAsync).toHaveBeenCalledWith(body);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it("가입 실패 시 서버 메시지를 표시하고 확인 후 실패 단계로 돌아간다", async () => {
		jest.mocked(toPartnerSignupBody).mockReturnValue({
			request: { phoneNumber: "01012345678" },
			licenseImage: {},
		} as ReturnType<typeof toPartnerSignupBody>);
		mutateAsync.mockRejectedValue(new Error("network failure"));
		jest
			.mocked(getApiErrorMessage)
			.mockReturnValue("사업자 등록증을 확인해주세요.");
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderHook(() =>
			usePartnerSignupAction({ form, onSuccess, onFailure }),
		);

		await act(async () => {
			await result.current.signup();
		});

		expect(alert).toHaveBeenCalledWith(
			"회원가입 실패",
			"사업자 등록증을 확인해주세요.",
			expect.any(Array),
		);
		expect(mutateAsync).toHaveBeenCalledTimes(1);
		alert.mock.calls[0]?.[2]?.[0]?.onPress?.();
		expect(onFailure).toHaveBeenCalledTimes(1);
	});
});
