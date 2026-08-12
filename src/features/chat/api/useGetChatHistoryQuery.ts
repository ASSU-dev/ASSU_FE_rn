import { useQuery } from "@tanstack/react-query";
import { getGetChatHistoryApi } from "@/shared/api";

const { getChatHistory } = getGetChatHistoryApi();

export function useGetChatHistoryQuery(roomId: number) {
	return useQuery({
		queryKey: ["chatMessages", roomId],
		queryFn: () => getChatHistory(roomId),
		staleTime: 0,
	});
}
