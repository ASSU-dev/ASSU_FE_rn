import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUnblockApi } from "@/shared/api";

const { unblock } = getUnblockApi();

export function useUnblockMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: unblock,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getBlockList"] });
			queryClient.invalidateQueries({ queryKey: ["chatRoomList"] });
		},
	});
}
