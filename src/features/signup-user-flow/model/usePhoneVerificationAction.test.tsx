import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useCheckAuthNumberMutation } from "../api/useCheckAuthNumberMutation";
import { useCheckPhoneAvailabilityAndSendAuthNumberMutation } from "../api/useCheckPhoneAvailabilityAndSendAuthNumberMutation";
import { usePhoneVerificationAction } from "./usePhoneVerificationAction";

jest.mock("../api/useCheckAuthNumberMutation", () => ({
	useCheckAuthNumberMutation: jest.fn(),
}));
jest.mock("../api/useCheckPhoneAvailabilityAndSendAuthNumberMutation", () => ({
	useCheckPhoneAvailabilityAndSendAuthNumberMutation: jest.fn(),
}));

const mockSendMutation = jest.mocked(
	useCheckPhoneAvailabilityAndSendAuthNumberMutation,
);
const mockVerifyMutation = jest.mocked(useCheckAuthNumberMutation);

describe("usePhoneVerificationAction", () => {
	const onCodeSent = jest.fn();
	const onVerifyFailed = jest.fn();
	const onVerified = jest.fn();

	beforeEach(() => {
		jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
		jest.clearAllMocks();
		mockSendMutation.mockReturnValue({
			mutateAsync: jest.fn(),
			isPending: false,
		} as never);
		mockVerifyMutation.mockReturnValue({
			mutateAsync: jest.fn(),
			isPending: false,
		} as never);
	});

	it("normalizes a valid number and starts code entry after a successful send", async () => {
		const mutateAsync = jest.fn().mockResolvedValue({ isSuccess: true });
		mockSendMutation.mockReturnValue({
			mutateAsync,
			isPending: false,
		} as never);
		const { result } = renderHook(() =>
			usePhoneVerificationAction({ onCodeSent, onVerifyFailed, onVerified }),
		);

		await act(() => result.current.sendCode("010-1234-5678"));

		expect(mutateAsync).toHaveBeenCalledWith({ phoneNumber: "01012345678" });
		expect(onCodeSent).toHaveBeenCalledTimes(1);
	});

	it("blocks an invalid phone number before the API request", async () => {
		const mutateAsync = jest.fn();
		mockSendMutation.mockReturnValue({
			mutateAsync,
			isPending: false,
		} as never);
		const { result } = renderHook(() =>
			usePhoneVerificationAction({ onCodeSent, onVerifyFailed, onVerified }),
		);

		await act(() => result.current.sendCode("010-1234"));

		expect(mutateAsync).not.toHaveBeenCalled();
		expect(Alert.alert).toHaveBeenCalledWith(
			"전화번호 확인",
			"010으로 시작하는 11자리 숫자를 입력해주세요.",
		);
	});

	it("marks verification as failed and informs the user when verification fails", async () => {
		const mutateAsync = jest.fn().mockRejectedValue(new Error());
		mockVerifyMutation.mockReturnValue({
			mutateAsync,
			isPending: false,
		} as never);
		const { result } = renderHook(() =>
			usePhoneVerificationAction({ onCodeSent, onVerifyFailed, onVerified }),
		);

		await act(() => result.current.verifyCode("010-1234-5678", "123456"));

		expect(onVerifyFailed).toHaveBeenCalledTimes(1);
		expect(onVerified).not.toHaveBeenCalled();
		expect(Alert.alert).toHaveBeenCalledWith(
			"인증 실패",
			"인증번호 인증에 실패했습니다.",
		);
	});
});
