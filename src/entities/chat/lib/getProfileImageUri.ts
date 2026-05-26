import type { ImageSource } from "expo-image";

const DEFAULT_PROFILE_IMAGE =
	require("@/shared/assets/images/default-profile.png") as ImageSource;

export function getProfileImageUri(uri: string | undefined): ImageSource {
	if (uri) return { uri };
	return DEFAULT_PROFILE_IMAGE;
}
