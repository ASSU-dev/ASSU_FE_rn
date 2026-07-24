import { getHomeRouteByRole, saveTokens } from "@/shared/api/auth";
import type { UserBasicInfo } from "@/shared/lib/auth/authStore";

interface Tokens {
	accessToken?: string;
	refreshToken?: string;
}

export async function completeLogin(
	tokens: Tokens,
	role?: string | null,
	basicInfo?: UserBasicInfo | null,
): Promise<string> {
	if (tokens.accessToken && tokens.refreshToken) {
		await saveTokens(tokens.accessToken, tokens.refreshToken, role, basicInfo);
	}
	return getHomeRouteByRole(role ?? null);
}
