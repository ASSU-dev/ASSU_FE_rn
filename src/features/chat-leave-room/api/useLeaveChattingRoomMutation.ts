import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLeaveChattingRoomApi } from "@/shared/api";

const { leaveChattingRoom } = getLeaveChattingRoomApi();

export function useLeaveChattingRoomMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: leaveChattingRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["chatRoomList"] });
		},
	});
}
