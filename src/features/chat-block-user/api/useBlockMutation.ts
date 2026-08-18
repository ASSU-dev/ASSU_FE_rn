import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlockApi } from "@/shared/api";

const { block } = getBlockApi();

export function useBlockMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: block,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getBlockList"] });
			queryClient.invalidateQueries({ queryKey: ["chatRoomList"] });
		},
	});
}
