import { apiInstance } from "@/shared/api";

export interface ProfileImageFile {
	uri: string;
	name: string;
	type: string;
}

export async function replaceProfileImage(file: ProfileImageFile) {
	const formData = new FormData();
	formData.append("image", file as unknown as Blob);

	await apiInstance.put("/members/me/profile-image", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
}

export async function deleteProfileImage() {
	await apiInstance.delete("/members/me/profile-image");
}
