import { renderHook } from "@testing-library/react-native";
import { isAxiosError } from "axios";
import { Alert } from "react-native";
import { useCheckEmailAvailabilityMutation } from "../api/useCheckEmailAvailabilityMutation";
import { useAdminEmailAvailabilityAction } from "./useAdminEmailAvailabilityAction";

jest.mock("axios", () => ({ isAxiosError: jest.fn() }));
jest.mock("../api/useCheckEmailAvailabilityMutation", () => ({
	useCheckEmailAvailabilityMutation: jest.fn(),
}));

const mutateAsync = jest.fn();

describe("useAdminEmailAvailabilityAction 관리자 이메일 중복 확인", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useCheckEmailAvailabilityMutation).mockReturnValue({
			mutateAsync,
		} as unknown as ReturnType<typeof useCheckEmailAvailabilityMutation>);
	});

	it("사용 가능한 이메일이면 true를 반환한다", async () => {
		mutateAsync.mockResolvedValue({ isSuccess: true });
		const { result } = renderHook(() => useAdminEmailAvailabilityAction());

		await expect(
			result.current.checkEmailAvailability("admin@assu.com"),
		).resolves.toBe(true);
		expect(mutateAsync).toHaveBeenCalledWith({ email: "admin@assu.com" });
	});

	it("중복 이메일 응답이면 중복 안내와 false를 반환한다", async () => {
		mutateAsync.mockRejectedValue({ response: { status: 404 } });
		jest.mocked(isAxiosError).mockReturnValue(true);
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderHook(() => useAdminEmailAvailabilityAction());

		await expect(
			result.current.checkEmailAvailability("used@assu.com"),
		).resolves.toBe(false);
		expect(alert).toHaveBeenCalledWith(
			"이메일 중복확인 실패",
			"이미 사용 중인 이메일입니다.",
		);
	});
});
