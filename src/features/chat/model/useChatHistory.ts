import type { Message } from "@/entities/chat";
import { useGetChatHistoryQuery } from "../api/useGetChatHistoryQuery";

interface UseChatHistoryResult {
	messages: Message[];
	isLoading: boolean;
	isError: boolean;
}

export function useChatHistory(roomId: number): UseChatHistoryResult {
	const { data, isLoading, isError } = useGetChatHistoryQuery(roomId);

	const messages = (data?.result?.messages ?? []) as Message[];

	return { messages, isLoading, isError };
}
