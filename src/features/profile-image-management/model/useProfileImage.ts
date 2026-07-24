import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileImageQueryKey } from "@/entities/user/api/useProfileImageQuery";
import { deleteProfileImage, replaceProfileImage } from "../api/profileImage";

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
