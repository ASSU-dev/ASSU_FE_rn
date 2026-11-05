import { getHomeRouteByRole, saveTokens } from "@/shared/api/auth";
import { completeLogin, getPostAuthRoute } from "./auth";

jest.mock("@/shared/api/auth", () => ({
	getHomeRouteByRole: jest.fn(),
	saveTokens: jest.fn(),
}));

describe("로그인 후 이동 경로", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest
			.mocked(getHomeRouteByRole)
			.mockReturnValue("/(protected)/admin/(tabs)/home");
	});

	it("인증 완료 페이지의 유효한 returnTo가 있으면 역할 홈보다 우선한다", () => {
		expect(getPostAuthRoute("ADMIN", "/verify?storeId=12")).toBe(
			"/verify?storeId=12",
		);
		expect(getHomeRouteByRole).not.toHaveBeenCalled();
	});

	it.each([
		{ returnTo: "/verify?storeId=0" },
		{ returnTo: "/verify?storeId=not-a-number" },
		{ returnTo: "/(protected)/admin/(tabs)/home" },
		{ returnTo: "https://malicious.example/verify?storeId=12" },
	])("안전하지 않은 returnTo($returnTo)는 역할별 홈으로 이동한다", ({
		returnTo,
	}) => {
		expect(getPostAuthRoute("ADMIN", returnTo)).toBe(
			"/(protected)/admin/(tabs)/home",
		);
		expect(getHomeRouteByRole).toHaveBeenCalledWith("ADMIN");
	});
});

describe("로그인 세션 완료", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest
			.mocked(getHomeRouteByRole)
			.mockReturnValue("/(protected)/partner/(tabs)/home");
	});

	it("토큰과 역할을 저장한 뒤 역할별 홈 경로를 반환한다", async () => {
		const basicInfo = { name: "제휴업체 담당자" };

		await expect(
			completeLogin(
				{ accessToken: "access", refreshToken: "refresh" },
				"PARTNER",
				basicInfo,
				42,
			),
		).resolves.toBe("/(protected)/partner/(tabs)/home");

		expect(saveTokens).toHaveBeenCalledWith(
			"access",
			"refresh",
			"PARTNER",
			basicInfo,
			42,
		);
	});

	it.each([
		{
			case: "access token이 없는 경우",
			tokens: { refreshToken: "refresh" },
			role: "ADMIN",
		},
		{
			case: "refresh token이 없는 경우",
			tokens: { accessToken: "access" },
			role: "ADMIN",
		},
		{
			case: "역할이 없는 경우",
			tokens: { accessToken: "access", refreshToken: "refresh" },
			role: undefined,
		},
	])("$case에는 세션을 저장하지 않고 로그인 완료를 중단한다", async ({
		tokens,
		role,
	}) => {
		await expect(completeLogin(tokens, role)).rejects.toThrow();
		expect(saveTokens).not.toHaveBeenCalled();
	});
});
