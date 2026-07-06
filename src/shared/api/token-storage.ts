import * as SecureStore from "expo-secure-store";
import type { UserBasicInfo } from "@/shared/lib/auth/authStore";

const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ROLE_KEY = "userRole";
const USER_BASIC_INFO_KEY = "userBasicInfo";

export async function setRefreshToken(token: string) {
	await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken() {
	return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function deleteRefreshToken() {
	await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export async function setUserRole(role: string) {
	await SecureStore.setItemAsync(USER_ROLE_KEY, role);
}

export async function getUserRole() {
	return SecureStore.getItemAsync(USER_ROLE_KEY);
}

export async function deleteUserRole() {
	await SecureStore.deleteItemAsync(USER_ROLE_KEY);
}

export async function setUserBasicInfo(basicInfo: UserBasicInfo) {
	await SecureStore.setItemAsync(
		USER_BASIC_INFO_KEY,
		JSON.stringify(basicInfo),
	);
}

export async function getUserBasicInfo(): Promise<UserBasicInfo | null> {
	const value = await SecureStore.getItemAsync(USER_BASIC_INFO_KEY);
	if (!value) return null;

	try {
		return JSON.parse(value) as UserBasicInfo;
	} catch {
		await deleteUserBasicInfo();
		return null;
	}
}

export async function deleteUserBasicInfo() {
	await SecureStore.deleteItemAsync(USER_BASIC_INFO_KEY);
}
