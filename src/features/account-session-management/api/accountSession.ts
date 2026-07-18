import { apiInstance } from "@/shared/api";

export async function logout() {
	await apiInstance.post("/auth/logout");
}

export async function withdrawAccount() {
	await apiInstance.patch("/auth/withdraw");
}

export async function unregisterDeviceToken(tokenId: number) {
	await apiInstance.delete(`/device-tokens/${tokenId}`);
}
