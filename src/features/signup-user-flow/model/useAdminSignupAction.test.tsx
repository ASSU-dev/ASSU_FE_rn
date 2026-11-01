import { act, renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";
import { apiInstance, getApiErrorMessage } from "@/shared/api";
import { toAdminSignupBody } from "./signupPayloadAdapters";
import { useAdminSignupAction } from "./useAdminSignupAction";

jest.mock("@/shared/api", () => ({
	apiInstance: { post: jest.fn() },
	getApiErrorMessage: jest.fn(),
}));
jest.mock("./signupPayloadAdapters", () => ({ toAdminSignupBody: jest.fn() }));

const onSuccess = jest.fn();
const onFailure = jest.fn();
const form = {} as Parameters<typeof useAdminSignupAction>[0]["form"];
const originalFormData = global.FormData;

describe("useAdminSignupAction 관리자 회원가입", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		global.FormData = originalFormData;
	});

	it("관리자 가입 정보와 인감 이미지를 multipart 요청으로 보내고 성공 단계를 연다", async () => {
		const append = jest.fn();
		global.FormData = jest.fn(() => ({ append })) as unknown as typeof FormData;
		jest.mocked(toAdminSignupBody).mockReturnValue({
			request: { phoneNumber: "01012345678" } as never,
			signImage: { uri: "file:///seal.png" } as never,
		});
		jest
			.mocked(apiInstance.post)
			.mockResolvedValue({ data: { isSuccess: true } });
		const { result } = renderHook(() =>
			useAdminSignupAction({ form, onSuccess, onFailure }),
		);

		await act(async () => {
			await result.current.signup();
		});

		expect(append).toHaveBeenNthCalledWith(
			1,
			"request",
			'{"phoneNumber":"01012345678"}',
		);
		expect(append).toHaveBeenNthCalledWith(2, "signImage", {
			uri: "file:///seal.png",
		});
		expect(apiInstance.post).toHaveBeenCalledWith(
			"/auth/admins/signup",
			expect.anything(),
			{ headers: { "Content-Type": "multipart/form-data" } },
		);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});

	it("가입 실패 시 서버 메시지를 표시하고 확인 후 실패 단계로 돌아간다", async () => {
		const append = jest.fn();
		global.FormData = jest.fn(() => ({ append })) as unknown as typeof FormData;
		jest.mocked(toAdminSignupBody).mockReturnValue({
			request: { phoneNumber: "01012345678" } as never,
			signImage: { uri: "file:///seal.png" } as never,
		});
		jest
			.mocked(apiInstance.post)
			.mockRejectedValue(new Error("network failure"));
		jest
			.mocked(getApiErrorMessage)
			.mockReturnValue("인감 이미지를 등록해주세요.");
		const alert = jest.spyOn(Alert, "alert");
		const { result } = renderHook(() =>
			useAdminSignupAction({ form, onSuccess, onFailure }),
		);

		await act(async () => {
			await result.current.signup();
		});

		expect(alert).toHaveBeenCalledWith(
			"회원가입 실패",
			"인감 이미지를 등록해주세요.",
			expect.any(Array),
		);
		expect(apiInstance.post).toHaveBeenCalledTimes(1);
		alert.mock.calls[0]?.[2]?.[0]?.onPress?.();
		expect(onFailure).toHaveBeenCalledTimes(1);
	});
});
