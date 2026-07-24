import { useMutation } from "@tanstack/react-query";
import { getCreateChatRoomApi } from "@/shared/api";

const { createChatRoom } = getCreateChatRoomApi();

export function useCreateChatRoomMutation() {
	return useMutation({ mutationFn: createChatRoom });
}
