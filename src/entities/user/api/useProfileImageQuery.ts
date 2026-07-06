import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type { BaseResponse, ProfileImageResponseDTO } from "../model/types";

const PROFILE_IMAGE_STALE_TIME_MS = 1000 * 60 * 8;

async function fetchProfileImage(): Promise<ProfileImageResponseDTO | null> {
	const response = await apiInstance.get<BaseResponse<ProfileImageResponseDTO>>(
		"/members/me/profile-image",
	);

	return response.data.result ?? null;
}

export function useProfileImageQuery() {
	return useQuery({
		queryKey: ["user", "profile-image"],
		queryFn: fetchProfileImage,
		staleTime: PROFILE_IMAGE_STALE_TIME_MS,
	});
}
