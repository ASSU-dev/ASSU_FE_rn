import { useMutation } from "@tanstack/react-query";
import { getLeaveChattingRoomApi } from "@/shared/api";

const { leaveChattingRoom } = getLeaveChattingRoomApi();

export function useLeaveChattingRoomMutation() {
	return useMutation({ mutationFn: leaveChattingRoom });
}
