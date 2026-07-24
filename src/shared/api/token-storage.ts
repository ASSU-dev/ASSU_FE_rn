import * as SecureStore from "expo-secure-store";
import type { UserBasicInfo } from "@/shared/lib/auth/authStore";

const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_KEY = "accessToken";
const USER_ROLE_KEY = "userRole";
const USER_BASIC_INFO_KEY = "userBasicInfo";
const DEVICE_TOKEN_ID_KEY = "deviceTokenId";

export async function setAccessToken(token: string) {
	await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken() {
	return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function deleteAccessToken() {
	await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

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

const FCM_TOKEN_KEY = "fcmDeviceToken";

export async function setFcmDeviceToken(token: string) {
	await SecureStore.setItemAsync(FCM_TOKEN_KEY, token);
}

export async function getFcmDeviceToken() {
	return SecureStore.getItemAsync(FCM_TOKEN_KEY);
}

export async function deleteFcmDeviceToken() {
	await SecureStore.deleteItemAsync(FCM_TOKEN_KEY);
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

export async function setDeviceTokenId(tokenId: number) {
	await SecureStore.setItemAsync(DEVICE_TOKEN_ID_KEY, String(tokenId));
}

export async function getDeviceTokenId(): Promise<number | null> {
	const value = await SecureStore.getItemAsync(DEVICE_TOKEN_ID_KEY);
	if (!value) return null;

	const tokenId = Number(value);
	return Number.isSafeInteger(tokenId) && tokenId > 0 ? tokenId : null;
}

export async function deleteDeviceTokenId() {
	await SecureStore.deleteItemAsync(DEVICE_TOKEN_ID_KEY);
}
