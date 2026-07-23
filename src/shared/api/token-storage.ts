import * as SecureStore from "expo-secure-store";

const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_KEY = "accessToken";
const USER_ROLE_KEY = "userRole";

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
