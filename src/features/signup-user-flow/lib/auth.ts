import { getHomeRouteByRole, saveTokens } from "@/shared/api/auth";

interface Tokens {
	accessToken?: string;
	refreshToken?: string;
}

export async function completeLogin(
	tokens: Tokens,
	role?: string | null,
): Promise<string> {
	if (tokens.accessToken && tokens.refreshToken) {
		await saveTokens(tokens.accessToken, tokens.refreshToken, role);
	}
	return getHomeRouteByRole(role ?? null);
}
