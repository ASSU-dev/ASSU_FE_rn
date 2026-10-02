import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { apiInstance } from "@/shared/api";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import { useAdminSignupAction } from "./useAdminSignupAction";

jest.mock("@/shared/api", () => ({
	...jest.requireActual("@/shared/api"),
	apiInstance: { post: jest.fn() },
}));

const mockPost = jest.mocked(apiInstance.post);

describe("useAdminSignupAction", () => {
	const onSuccess = jest.fn();
	const onFailure = jest.fn();

	beforeEach(() => {
		jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
		jest.clearAllMocks();
	});

	it("uploads the seal and moves forward after successful admin signup", async () => {
		const form = structuredClone(DEFAULT_SIGNUP_FORM_STATE);
		form.admin.organizationType = "GENERAL_STUDENT_COUNCIL";
		form.admin.sealFile = {
			uri: "file:///seal.png",
			name: "seal.png",
			mimeType: "image/png",
		};
		mockPost.mockResolvedValue({ data: { isSuccess: true } } as never);
		const { result } = renderHook(() =>
			useAdminSignupAction({ form, onSuccess, onFailure }),
		);

		await act(() => result.current.signup());

		expect(mockPost).toHaveBeenCalledWith(
			"/auth/admins/signup",
			expect.any(FormData),
			expect.objectContaining({
				headers: { "Content-Type": "multipart/form-data" },
			}),
		);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it("shows the duplicate account message when admin signup fails", async () => {
		const form = structuredClone(DEFAULT_SIGNUP_FORM_STATE);
		form.admin.sealFile = {
			uri: "file:///seal.png",
			name: "seal.png",
			mimeType: "image/png",
		};
		mockPost.mockRejectedValue({
			isAxiosError: true,
			response: { status: 409 },
		});
		const { result } = renderHook(() =>
			useAdminSignupAction({ form, onSuccess, onFailure }),
		);

		await act(() => result.current.signup());

		expect(Alert.alert).toHaveBeenCalledWith(
			"회원가입 실패",
			"이미 존재하는 계정입니다.",
			expect.any(Array),
		);
	});
});
