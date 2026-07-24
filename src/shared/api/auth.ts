import type { UserBasicInfo } from "@/shared/lib/auth/authStore";
import { type UserRole, useAuthStore } from "@/shared/lib/auth/authStore";
import { apiInstance } from "./instance";
import {
	deleteRefreshToken,
	deleteUserBasicInfo,
	deleteUserRole,
	getRefreshToken,
	getUserBasicInfo,
	getUserRole,
	setRefreshToken,
	setUserBasicInfo,
	setUserRole,
} from "./token-storage";

export function getHomeRouteByRole(role: UserRole | string | null): string {
	switch (role) {
		case "ADMIN":
			return "/(protected)/admin/(tabs)/home";
		case "PARTNER":
			return "/(protected)/partner/(tabs)/home";
		default:
			return "/(protected)/student/(tabs)/home";
	}
}

export async function saveTokens(
	accessToken: string,
	refreshToken: string,
	role?: UserRole | string | null,
	basicInfo?: UserBasicInfo | null,
) {
	useAuthStore.getState().setAccessToken(accessToken);
	await setRefreshToken(refreshToken);
	if (role) {
		useAuthStore.getState().setRole(role as UserRole);
		await setUserRole(role);
	}
	if (basicInfo) {
		useAuthStore.getState().setBasicInfo(basicInfo);
		await setUserBasicInfo(basicInfo);
	} else {
		useAuthStore.getState().setBasicInfo(null);
		await deleteUserBasicInfo();
	}
}

export async function clearTokens() {
	useAuthStore.getState().clearAccessToken();
	await deleteRefreshToken();
	await deleteUserRole();
	await deleteUserBasicInfo();
}

/** 앱 시작 시 SecureStore의 refreshToken으로 자동 로그인 시도. 역할 포함 반환 */
export async function initAuth(): Promise<{
	isLoggedIn: boolean;
	role: UserRole | null;
}> {
	const storedRefresh = await getRefreshToken();
	if (!storedRefresh) return { isLoggedIn: false, role: null };

	try {
		const res = await apiInstance.post(
			"/auth/tokens/refresh",
			{},
			{ headers: { RefreshToken: storedRefresh } },
		);
		const { newAccess, newRefresh } = res.data.result ?? {};
		if (!newAccess || !newRefresh) return { isLoggedIn: false, role: null };

		const role = (await getUserRole()) as UserRole | null;
		const basicInfo = await getUserBasicInfo();
		useAuthStore.getState().setAccessToken(newAccess);
		if (role) useAuthStore.getState().setRole(role);
		useAuthStore.getState().setBasicInfo(basicInfo);
		await setRefreshToken(newRefresh);

		return { isLoggedIn: true, role };
	} catch {
		await deleteRefreshToken();
		await deleteUserRole();
		await deleteUserBasicInfo();
		return { isLoggedIn: false, role: null };
	}
}
