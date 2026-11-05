import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useSignupPartnerMutation } from "../api/useSignupPartnerMutation";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import { usePartnerSignupAction } from "./usePartnerSignupAction";

jest.mock("../api/useSignupPartnerMutation", () => ({
	useSignupPartnerMutation: jest.fn(),
}));

const mockSignupMutation = jest.mocked(useSignupPartnerMutation);

describe("usePartnerSignupAction", () => {
	const onSuccess = jest.fn();
	const onFailure = jest.fn();

	beforeEach(() => {
		jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
		jest.clearAllMocks();
		mockSignupMutation.mockReturnValue({ mutateAsync: jest.fn() } as never);
	});

	it("submits a valid business registration and completes signup", async () => {
		const form = structuredClone(DEFAULT_SIGNUP_FORM_STATE);
		form.partner.businessRegistrationFile = {
			uri: "file:///license.png",
			name: "license.png",
			mimeType: "image/png",
		};
		const mutateAsync = jest.fn().mockResolvedValue({ isSuccess: true });
		mockSignupMutation.mockReturnValue({ mutateAsync } as never);
		const { result } = renderHook(() =>
			usePartnerSignupAction({ form, onSuccess, onFailure }),
		);

		await act(() => result.current.signup());

		expect(mutateAsync).toHaveBeenCalledWith(
			expect.objectContaining({ licenseImage: expect.any(Object) }),
		);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it("shows a recoverable error when the required file is missing", async () => {
		const form = structuredClone(DEFAULT_SIGNUP_FORM_STATE);
		const { result } = renderHook(() =>
			usePartnerSignupAction({ form, onSuccess, onFailure }),
		);

		await act(() => result.current.signup());

		expect(Alert.alert).toHaveBeenCalledWith(
			"회원가입 실패",
			"사업자 등록증을 등록해주세요.",
			expect.any(Array),
		);
	});
});
