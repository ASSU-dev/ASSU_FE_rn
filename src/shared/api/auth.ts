import type { UserBasicInfo } from "@/shared/lib/auth/authStore";
import { type UserRole, useAuthStore } from "@/shared/lib/auth/authStore";
import { apiInstance } from "./instance";
import {
	deleteAccessToken,
	deleteRefreshToken,
	deleteUserBasicInfo,
	deleteUserMemberId,
	deleteUserRole,
	getAccessToken,
	getRefreshToken,
	getUserBasicInfo,
	getUserMemberId,
	getUserRole,
	setAccessToken,
	setRefreshToken,
	setUserBasicInfo,
	setUserMemberId,
	setUserRole,
} from "./token-storage";

type InitAuthResult = {
	isLoggedIn: boolean;
	role: UserRole | null;
};

type AccessTokenPayload = {
	role?: UserRole;
};

let initAuthPromise: Promise<InitAuthResult> | null = null;
let initAuthResult: InitAuthResult | null = null;

function decodeAccessTokenRole(accessToken: string): UserRole | null {
	try {
		const payload = accessToken.split(".")[1];
		if (!payload) return null;

		const normalizedPayload = payload
			.replace(/-/g, "+")
			.replace(/_/g, "/")
			.padEnd(Math.ceil(payload.length / 4) * 4, "=");
		const decodedPayload = globalThis.atob(normalizedPayload);
		const parsedPayload = JSON.parse(decodedPayload) as AccessTokenPayload;

		return parsedPayload.role ?? null;
	} catch {
		return null;
	}
}

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
	memberId?: number | null,
) {
	const resolvedRole = role
		? (role as UserRole)
		: decodeAccessTokenRole(accessToken);

	if (__DEV__) console.log("[Auth] accessToken:", accessToken);
	useAuthStore.getState().setAccessToken(accessToken);
	await setAccessToken(accessToken);
	await setRefreshToken(refreshToken);
	if (
		typeof memberId === "number" &&
		Number.isSafeInteger(memberId) &&
		memberId > 0
	) {
		useAuthStore.getState().setMemberId(memberId);
		await setUserMemberId(memberId);
	} else {
		useAuthStore.getState().setMemberId(null);
		await deleteUserMemberId();
	}
	if (resolvedRole) {
		useAuthStore.getState().setRole(resolvedRole);
		await setUserRole(resolvedRole);
	}
	initAuthResult = {
		isLoggedIn: true,
		role: resolvedRole,
	};
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
	await deleteAccessToken();
	await deleteRefreshToken();
	await deleteUserMemberId();
	await deleteUserRole();
	initAuthResult = { isLoggedIn: false, role: null };
	initAuthPromise = null;
	await deleteUserBasicInfo();
}

/** 앱 시작 시 SecureStore의 refreshToken으로 자동 로그인 시도. 역할 포함 반환 */
export async function initAuth(): Promise<InitAuthResult> {
	if (initAuthResult) return initAuthResult;
	if (initAuthPromise) return initAuthPromise;

	initAuthPromise = restoreAuth();
	initAuthResult = await initAuthPromise;
	initAuthPromise = null;
	return initAuthResult;
}

async function restoreAuth(): Promise<InitAuthResult> {
	const storedRefresh = await getRefreshToken();
	const storedAccess = await getAccessToken();
	if (!storedRefresh || !storedAccess) return { isLoggedIn: false, role: null };

	try {
		const res = await apiInstance.post(
			"/auth/tokens/refresh",
			{},
			{
				headers: {
					Authorization: `Bearer ${storedAccess}`,
					RefreshToken: storedRefresh,
				},
			},
		);
		const {
			newAccess,
			newRefresh,
			memberId: refreshedMemberId,
		} = res.data.result ?? {};
		if (!newAccess || !newRefresh) return { isLoggedIn: false, role: null };

		if (__DEV__) console.log("[Auth] accessToken:", newAccess);

		const role =
			decodeAccessTokenRole(newAccess) ??
			((await getUserRole()) as UserRole | null);
		const basicInfo = await getUserBasicInfo();
		const storedMemberId = await getUserMemberId();
		const memberId =
			typeof refreshedMemberId === "number" &&
			Number.isSafeInteger(refreshedMemberId) &&
			refreshedMemberId > 0
				? refreshedMemberId
				: storedMemberId;
		useAuthStore.getState().setAccessToken(newAccess);
		useAuthStore.getState().setMemberId(memberId);
		if (role) {
			useAuthStore.getState().setRole(role);
			await setUserRole(role);
		}
		useAuthStore.getState().setBasicInfo(basicInfo);
		await setAccessToken(newAccess);
		await setRefreshToken(newRefresh);
		if (memberId !== null) await setUserMemberId(memberId);

		return { isLoggedIn: true, role };
	} catch {
		await deleteAccessToken();
		await deleteRefreshToken();
		await deleteUserMemberId();
		await deleteUserRole();
		await deleteUserBasicInfo();
		return { isLoggedIn: false, role: null };
	}
}
