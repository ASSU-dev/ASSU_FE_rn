import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useSignupMutation } from "../api/useSignupMutation";
import { useStudentSignupAction } from "./useStudentSignupAction";

jest.mock("../api/useSignupMutation", () => ({ useSignupMutation: jest.fn() }));

const mockSignupMutation = jest.mocked(useSignupMutation);

describe("useStudentSignupAction", () => {
	const onSuccess = jest.fn();
	const onFailure = jest.fn();

	beforeEach(() => {
		jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
		jest.clearAllMocks();
		mockSignupMutation.mockReturnValue({ mutateAsync: jest.fn() } as never);
	});

	it("requires LMS authentication before attempting signup", async () => {
		const { result } = renderHook(() =>
			useStudentSignupAction({
				studentAuthPayload: null,
				agreePrivacy: true,
				agreeMarketing: false,
				onSuccess,
				onFailure,
			}),
		);

		await act(() => result.current.signup());

		expect(Alert.alert).toHaveBeenCalledWith(
			"인증 필요",
			"먼저 LMS 인증을 진행해주세요.",
		);
	});

	it("moves forward after a successful student signup", async () => {
		const mutateAsync = jest.fn().mockResolvedValue({ isSuccess: true });
		mockSignupMutation.mockReturnValue({ mutateAsync } as never);
		const { result } = renderHook(() =>
			useStudentSignupAction({
				studentAuthPayload: { sIdno: "20231649", sToken: "token" },
				agreePrivacy: true,
				agreeMarketing: false,
				onSuccess,
				onFailure,
			}),
		);

		await act(() => result.current.signup());

		expect(mutateAsync).toHaveBeenCalledWith(
			expect.objectContaining({ locationAgree: true, marketingAgree: false }),
		);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it("keeps the user on a recoverable path when signup is rejected", async () => {
		const mutateAsync = jest.fn().mockResolvedValue({
			isSuccess: false,
			message: "이미 존재하는 계정입니다.",
		});
		mockSignupMutation.mockReturnValue({ mutateAsync } as never);
		const { result } = renderHook(() =>
			useStudentSignupAction({
				studentAuthPayload: { sIdno: "20231649", sToken: "token" },
				agreePrivacy: true,
				agreeMarketing: false,
				onSuccess,
				onFailure,
			}),
		);

		await act(() => result.current.signup());

		expect(Alert.alert).toHaveBeenCalledWith(
			"회원가입 실패",
			"이미 존재하는 계정입니다.",
			expect.any(Array),
		);
	});
});
