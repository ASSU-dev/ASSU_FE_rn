import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

import { getProfileImageUri, type Message } from "@/entities/chat";
import { useReadMessageMutation } from "@/features/chat/api/useReadMessageMutation";
import { useChatHistory } from "@/features/chat/model/useChatHistory";
import { useChatRoomList } from "@/features/chat/model/useChatRoomList";
import { useChatWebSocket } from "@/features/chat/model/useChatWebSocket";
import { useBlockMutation } from "@/features/chat-block-user/api/useBlockMutation";
import { useLeaveChattingRoomMutation } from "@/features/chat-leave-room/api/useLeaveChattingRoomMutation";
import { useAuthStore } from "@/shared/lib/auth/authStore";

export function useChatRoom(roomId: string, onLeaveSuccess: () => void) {
	const userId = useAuthStore((s) => s.userId);
	const queryClient = useQueryClient();

	const { rooms } = useChatRoomList();
	const room = rooms.find((r) => String(r.roomId) === roomId);
	const profileImage = getProfileImageUri(room?.opponentProfileImage);

	// 서버에서 가져온 메시지들
	const { messages: serverMessages } = useChatHistory(Number(roomId));
	const messages = useMemo(
		() => [...serverMessages].reverse(),
		[serverMessages],
	);

	// 채팅 메시지 캐시 업데이트 - 내가 보낸 메세지
	function updateChatCache(newMessage: Message) {
		queryClient.setQueryData(
			["chatMessages", Number(roomId)],
			(old: unknown) => {
				const data = old as { result?: { messages?: Message[] } } | undefined;
				const oldMessages: Message[] =
					data?.result?.messages ??
					(Array.isArray(old) ? (old as Message[]) : []);

				if (
					newMessage.messageId !== undefined &&
					oldMessages.some((m) => m.messageId === newMessage.messageId)
				) {
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
			},
		);
	}

	const markMessagesAsRead = useCallback(
		(readIds: Set<number>) => {
			queryClient.setQueryData(
				["chatMessages", Number(roomId)],
				(old: unknown) => {
					const data = old as { result?: { messages?: Message[] } } | undefined;
					const oldMessages: Message[] =
						data?.result?.messages ??
						(Array.isArray(old) ? (old as Message[]) : []);

					const updatedMessages = oldMessages.map((m) =>
						m.messageId !== undefined && readIds.has(m.messageId)
							? { ...m, unreadCountForSender: 0 }
							: m,
					);

					if (data?.result?.messages !== undefined) {
						return {
							...data,
							result: { ...data.result, messages: updatedMessages },
						};
					}
					return updatedMessages;
				},
			);
		},
		[queryClient, roomId],
	);

	const { mutate: readMessage } = useReadMessageMutation();
	useEffect(() => {
		readMessage(Number(roomId), {
			onSuccess: (data) => {
				markMessagesAsRead(new Set(data.result?.readMessagesId ?? []));
			},
		});
		return () => {
			queryClient.invalidateQueries({ queryKey: ["chatRoomList"] });
		};
	}, [roomId, markMessagesAsRead, queryClient, readMessage]);

	const { sendMessage } = useChatWebSocket(Number(roomId), () => {
		readMessage(Number(roomId), {
			onSuccess: (data) => {
				markMessagesAsRead(new Set(data.result?.readMessagesId ?? []));
			},
		});
	});
	const blockMutation = useBlockMutation();
	const leaveMutation = useLeaveChattingRoomMutation();

	function handleSend(text: string) {
		updateChatCache({
			messageId: Date.now(),
			message: text,
			sendTime: new Date().toISOString(),
			isMyMessage: true,
			messageType: "TEXT",
		});

		if (userId && room?.opponentId) {
			sendMessage({
				roomId: Number(roomId),
				senderId: userId,
				receiverId: room.opponentId,
				message: text,
			});
		}
	}

	function handleBlock() {
		if (!room?.opponentId) return;
		blockMutation.mutate({ opponentId: room.opponentId });
	}

	function handleLeave() {
		leaveMutation.mutate(Number(roomId), {
			onSuccess: onLeaveSuccess,
		});
	}

	return {
		roomName: room?.opponentName ?? "채팅방",
		profileImage,
		messages,
		handleSend,
		handleBlock,
		handleLeave,
	};
}
