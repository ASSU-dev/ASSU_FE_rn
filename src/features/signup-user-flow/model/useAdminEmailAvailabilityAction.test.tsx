import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useCheckEmailAvailabilityMutation } from "../api/useCheckEmailAvailabilityMutation";
import { useAdminEmailAvailabilityAction } from "./useAdminEmailAvailabilityAction";

jest.mock("../api/useCheckEmailAvailabilityMutation", () => ({
	useCheckEmailAvailabilityMutation: jest.fn(),
}));

const mockEmailMutation = jest.mocked(useCheckEmailAvailabilityMutation);

describe("useAdminEmailAvailabilityAction", () => {
	beforeEach(() => {
		jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
		jest.clearAllMocks();
	});

	it("allows the signup flow to continue when the email is available", async () => {
		const mutateAsync = jest.fn().mockResolvedValue({ isSuccess: true });
		mockEmailMutation.mockReturnValue({ mutateAsync } as never);
		const { result } = renderHook(() => useAdminEmailAvailabilityAction());

		let isAvailable: boolean | undefined;
		await act(async () => {
			isAvailable =
				await result.current.checkEmailAvailability("admin@assu.kr");
		});

		expect(mutateAsync).toHaveBeenCalledWith({ email: "admin@assu.kr" });
		expect(isAvailable).toBe(true);
	});

	it("blocks progression and explains a duplicate email response", async () => {
		const mutateAsync = jest
			.fn()
			.mockRejectedValue({ isAxiosError: true, response: { status: 404 } });
		mockEmailMutation.mockReturnValue({ mutateAsync } as never);
		const { result } = renderHook(() => useAdminEmailAvailabilityAction());

		let isAvailable: boolean | undefined;
		await act(async () => {
			isAvailable = await result.current.checkEmailAvailability("used@assu.kr");
		});

		expect(isAvailable).toBe(false);
		expect(Alert.alert).toHaveBeenCalledWith(
			"이메일 중복확인 실패",
			"이미 사용 중인 이메일입니다.",
		);
	});
});
