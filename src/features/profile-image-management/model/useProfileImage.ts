import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	deleteProfileImage,
	getProfileImage,
	replaceProfileImage,
} from "../api/profileImage";

export const profileImageQueryKey = ["member", "profile-image"] as const;

export function useProfileImage() {
	return useQuery({ queryKey: profileImageQueryKey, queryFn: getProfileImage });
}

export function useReplaceProfileImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: replaceProfileImage,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: profileImageQueryKey }),
	});
}

export function useDeleteProfileImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteProfileImage,
		onSuccess: () => queryClient.setQueryData(profileImageQueryKey, null),
	});
}
