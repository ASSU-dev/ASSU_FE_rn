import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useEffect, useRef } from "react";

import type { Message } from "@/entities/chat";
import { useAuthStore } from "@/shared/lib/auth/authStore";
import { stompManager } from "@/shared/lib/stomp/stompManager";

import type { SendMessageResponseDTO } from "./stompTypes";

export interface SendMessageParams {
	roomId: number;
	senderId: number;
	receiverId: number;
	message: string;
}

export function useChatWebSocket(roomId: number, onReceive?: () => void) {
	const queryClient = useQueryClient();
	const onReceiveRef = useRef(onReceive);
	onReceiveRef.current = onReceive;

	useEffect(() => {
		const userId = useAuthStore.getState().userId;

		const unsubscribe = stompManager.subscribeToTopic(
			`/sub/chat/${roomId}`,
			(frame) => {
				const dto: SendMessageResponseDTO = JSON.parse(frame.body);

				if (dto.eventType === "READ_RECEIPT") {
					queryClient.setQueryData(["chatMessages", roomId], (old: unknown) => {
						const data = old as
							| { result?: { messages?: Message[] } }
							| undefined;
						const oldMessages: Message[] =
							data?.result?.messages ??
							(Array.isArray(old) ? (old as Message[]) : []);

						const updatedMessages = oldMessages.map((m) =>
							m.isMyMessage ? { ...m, unreadCountForSender: 0 } : m,
						);

						if (data?.result?.messages !== undefined) {
							return {
								...data,
								result: { ...data.result, messages: updatedMessages },
							};
						}
						return updatedMessages;
					});
					return;
				}

				if (dto.senderId === userId) return;

				const newMessage: Message = {
					messageId: dto.messageId,
					message: dto.message,
					sendTime: dto.sentAt.replace(" ", "T"),
					isMyMessage: false,
					messageType: dto.messageType as Message["messageType"],
					unreadCountForSender: dto.unreadCountForSender,
				};

				queryClient.setQueryData(["chatMessages", roomId], (old: unknown) => {
					const data = old as { result?: { messages?: Message[] } } | undefined;
					const oldMessages: Message[] =
						data?.result?.messages ??
						(Array.isArray(old) ? (old as Message[]) : []);

					if (oldMessages.some((m) => m.messageId === newMessage.messageId)) {
						return old;
					}

					const updatedMessages = [...oldMessages, newMessage];

					if (data?.result?.messages !== undefined) {
						return {
							...data,
							result: { ...data.result, messages: updatedMessages },
						};
					}
					return updatedMessages;
				});

				onReceiveRef.current?.();
			},
		);

		return unsubscribe;
	}, [roomId, queryClient]);

	const sendMessage = useCallback(
		({ roomId: rid, senderId, receiverId, message }: SendMessageParams) => {
			stompManager.publish(
				"/pub/send",
				JSON.stringify({
					roomId: rid,
					senderId,
					receiverId,
					message,
					send_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
					type: "TEXT",
				}),
			);
		},
		[],
	);

	return { sendMessage };
}
