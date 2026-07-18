import { apiInstance } from "@/shared/api";

interface BaseResponse<T> {
	result: T;
}

interface ProfileImageResult {
	profileImageUrl?: string | null;
	url?: string | null;
}

export interface ProfileImageFile {
	uri: string;
	name: string;
	type: string;
}

export async function getProfileImage(): Promise<string | null> {
	const { data } = await apiInstance.get<
		BaseResponse<ProfileImageResult | string | null>
	>("/members/me/profile-image");

	if (typeof data.result === "string" || data.result === null)
		return data.result;

	return data.result.profileImageUrl ?? data.result.url ?? null;
}

export async function replaceProfileImage(file: ProfileImageFile) {
	const formData = new FormData();
	formData.append("image", file as unknown as Blob);

	await apiInstance.put("/members/me/profile-image", formData);
}

export async function deleteProfileImage() {
	await apiInstance.delete("/members/me/profile-image");
}
