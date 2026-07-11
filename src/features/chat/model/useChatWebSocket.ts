import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useEffect, useRef } from "react";

import type { Message } from "@/entities/chat";
import { stompManager } from "@/shared/lib/stomp/stompManager";

import type { SendMessageResponseDTO } from "./stompTypes";

export interface SendMessageParams {
	roomId: number;
	senderId: number;
	receiverId: number;
	message: string;
}

// /sub/chat/{roomId} 구독
// - MESSAGE (상대방 발신): 상대 메시지 수신 → 캐시 추가 + onReceive 호출
// - MESSAGE (내 발신): 상대가 이미 방에 있어 즉시 읽힌 경우 → 내 메시지 "1" 제거
// - READ_RECEIPT (상대가 내 메시지 읽음): 내 메시지 "1" 제거
export function useChatWebSocket(roomId: number, onReceive?: () => void) {
	const queryClient = useQueryClient();
	// onReceive ref: 인라인 함수여도 effect 재실행 없이 최신 콜백 참조
	const onReceiveRef = useRef(onReceive);
	onReceiveRef.current = onReceive;

	useEffect(() => {
		const userId = 21; // TODO: useAuthStore에서 가져오기

		// 내가 보낸 모든 메시지 unreadCountForSender → 0
		function markSentMessagesRead() {
			queryClient.setQueryData(["chatMessages", roomId], (old: unknown) => {
				const data = old as { result?: { messages?: Message[] } } | undefined;
				const oldMessages: Message[] =
					data?.result?.messages ??
					(Array.isArray(old) ? (old as Message[]) : []);
				const updated = oldMessages.map((m) =>
					m.isMyMessage ? { ...m, unreadCountForSender: 0 } : m,
				);
				if (data?.result?.messages !== undefined) {
					return { ...data, result: { ...data.result, messages: updated } };
				}
				return updated;
			});
		}

		const unsubscribe = stompManager.subscribeToTopic(
			`/sub/chat/${roomId}`,
			(frame) => {
				const dto: SendMessageResponseDTO = JSON.parse(frame.body);

				if (dto.eventType === "READ_RECEIPT") {
					markSentMessagesRead();
					return;
				}

				if (dto.eventType !== "MESSAGE") return;

				// 내 발신 메시지 — 상대가 이미 방에 있어 unreadCount가 0으로 반환된 경우
				if (dto.senderId === userId) {
					if (dto.unreadCountForSender === 0) markSentMessagesRead();
					return;
				}

				// 상대 메시지 수신 — 채팅방에 있으므로 즉시 읽음(0) 처리
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
					if (oldMessages.some((m) => m.messageId === newMessage.messageId))
						return old;
					const updated = [...oldMessages, newMessage];
					if (data?.result?.messages !== undefined) {
						return { ...data, result: { ...data.result, messages: updated } };
					}
					return updated;
				});

				onReceiveRef.current?.();
			},
		);

		return unsubscribe;
	}, [roomId, queryClient]);

	// STOMP publish 래퍼 — 미연결 시 stompManager가 silently discard
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
