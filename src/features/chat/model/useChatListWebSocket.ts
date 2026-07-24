import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { stompManager } from "@/shared/lib/stomp/stompManager";

import type { ChatRoomUpdateDTO } from "./stompTypes";

export function useChatListWebSocket(userId: number | null) {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!userId) return;

		const unsubscribe = stompManager.subscribeToTopic(
			`/sub/chat/list/${userId}`,
			(frame) => {
				const dto: ChatRoomUpdateDTO = JSON.parse(frame.body);

				queryClient.setQueryData(["chatRoomList"], (old: unknown) => {
					const data = old as { result?: unknown[] } | undefined;
					const oldRooms: unknown[] =
						data?.result ?? (Array.isArray(old) ? old : []);

					const updatedRooms = oldRooms.map((room) => {
						const r = room as { roomId?: number };
						if (r.roomId === dto.roomId) {
							return {
								...r,
								lastMessage: dto.lastMessage,
								lastMessageTime: dto.lastMessageTime,
								unreadMessagesCount: dto.unreadCount,
							};
						}
						return room;
					});

					if (data?.result !== undefined) {
						return { ...data, result: updatedRooms };
					}
					return updatedRooms;
				});
			},
		);

		return unsubscribe;
	}, [userId, queryClient]);
}
