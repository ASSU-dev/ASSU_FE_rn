import { useQuery } from "@tanstack/react-query";
import { getGetChatRoomListApi } from "@/shared/api";

const { getChatRoomList } = getGetChatRoomListApi();

export function useGetChatRoomListQuery() {
	return useQuery({
		queryKey: ["chatRoomList"],
		queryFn: getChatRoomList,
	});
}
