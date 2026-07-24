import type { ChatRoomListResultDTO } from "@/shared/api";
import { useGetChatRoomListQuery } from "../api/useGetChatRoomListQuery";

interface UseChatRoomListResult {
	rooms: ChatRoomListResultDTO[];
	isLoading: boolean;
	isError: boolean;
}

export function useChatRoomList(): UseChatRoomListResult {
	const { data, isLoading, isError } = useGetChatRoomListQuery();

	return { rooms: data?.result ?? [], isLoading, isError };
}
