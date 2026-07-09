import { getHomeRouteByRole, saveTokens } from "@/shared/api/auth";

interface Tokens {
	accessToken?: string;
	refreshToken?: string;
}

export async function completeLogin(
	tokens: Tokens,
	role?: string | null,
): Promise<string> {
	if (!tokens.accessToken || !tokens.refreshToken) {
		throw new Error("로그인 토큰을 받지 못했습니다.");
	}
	if (!role) {
		throw new Error("로그인 응답에 역할 정보가 없습니다.");
	}

	await saveTokens(tokens.accessToken, tokens.refreshToken, role);
	return getHomeRouteByRole(role ?? null);
}
