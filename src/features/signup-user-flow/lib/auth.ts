import { getHomeRouteByRole, saveTokens } from "@/shared/api/auth";
import type { UserBasicInfo } from "@/shared/lib/auth/authStore";

interface Tokens {
	accessToken?: string;
	refreshToken?: string;
}

function getSafeReturnTo(returnTo?: string): string | null {
	if (!returnTo) return null;

	try {
		const parsed = new URL(returnTo, "https://assu.local");
		if (
			parsed.origin !== "https://assu.local" ||
			parsed.pathname !== "/verify"
		) {
			return null;
		}

		const storeId = Number(parsed.searchParams.get("storeId"));
		if (!Number.isSafeInteger(storeId) || storeId <= 0) return null;

		return `/verify?storeId=${storeId}`;
	} catch {
		return null;
	}
}

export function getPostAuthRoute(
	role?: string | null,
	returnTo?: string,
): string {
	return getSafeReturnTo(returnTo) ?? getHomeRouteByRole(role ?? null);
}

export async function completeLogin(
	tokens: Tokens,
	role?: string | null,
	basicInfo?: UserBasicInfo | null,
	memberId?: number | null,
	returnTo?: string,
): Promise<string> {
	if (!tokens.accessToken || !tokens.refreshToken) {
		throw new Error("로그인 토큰을 받지 못했습니다.");
	}
	if (!role) {
		throw new Error("로그인 응답에 역할 정보가 없습니다.");
	}

	await saveTokens(
		tokens.accessToken,
		tokens.refreshToken,
		role,
		basicInfo,
		memberId,
	);
	return getPostAuthRoute(role, returnTo);
}
