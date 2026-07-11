import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { getProfileImageUri, type Message } from "@/entities/chat";
import { useReadMessageMutation } from "@/features/chat/api/useReadMessageMutation";
import { useChatHistory } from "@/features/chat/model/useChatHistory";
import { useChatRoomList } from "@/features/chat/model/useChatRoomList";
import { useChatWebSocket } from "@/features/chat/model/useChatWebSocket";
import { useBlockMutation } from "@/features/chat-block-user/api/useBlockMutation";
import { useLeaveChattingRoomMutation } from "@/features/chat-leave-room/api/useLeaveChattingRoomMutation";

// 채팅방 전체 상태·액션 통합 훅
export function useChatRoom(roomId: string, onLeaveSuccess: () => void) {
	const userId = 21; // TODO: useAuthStore에서 가져오기
	const queryClient = useQueryClient();

	const { rooms } = useChatRoomList();
	const room = rooms.find((r) => String(r.roomId) === roomId);
	const profileImage = getProfileImageUri(room?.opponentProfileImage);

	// 히스토리 fetch → inverted FlatList용 reverse (API: oldest-first → newest-first)
	const { messages: serverMessages } = useChatHistory(Number(roomId));
	const messages = useMemo(
		() => [...serverMessages].reverse(),
		[serverMessages],
	);

	// 낙관적 UI(메세지) — 내가 보낸 메시지를 서버 응답 전에 즉시 표시
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

	const { mutate: readMessage } = useReadMessageMutation();
	// 입장: 상대방 메시지 읽음 처리 → 메세지 캐시 업데이트(readMessagesId로 캐시 unreadCountForSender: 0)
	// 퇴장: chatRoomList invalidate → 목록 화면 복귀 시 최신 상태 반영
	useEffect(() => {
		readMessage(Number(roomId), {
			onSuccess: (data) => {
				const readIds = new Set(data.result?.readMessagesId ?? []);

				queryClient.setQueryData(
					["chatMessages", Number(roomId)],
					(old: unknown) => {
						const msgs = old as
							| { result?: { messages?: Message[] } }
							| undefined;
						const oldMessages: Message[] =
							msgs?.result?.messages ??
							(Array.isArray(old) ? (old as Message[]) : []);
						const updated = oldMessages.map((m) =>
							m.messageId !== undefined && readIds.has(m.messageId)
								? { ...m, unreadCountForSender: 0 }
								: m,
						);
						if (msgs?.result?.messages !== undefined) {
							return { ...msgs, result: { ...msgs.result, messages: updated } };
						}
						return updated;
					},
				);
			},
		});
		return () => {
			queryClient.invalidateQueries({ queryKey: ["chatRoomList"] });
		};
	}, [roomId, queryClient, readMessage]);

	// 메시지 발행
	const { sendMessage } = useChatWebSocket(Number(roomId), () =>
		readMessage(Number(roomId)),
	);

	const blockMutation = useBlockMutation();
	const leaveMutation = useLeaveChattingRoomMutation();

	function handleSend(text: string) {
		updateChatCache({
			messageId: Date.now(),
			message: text,
			sendTime: new Date().toISOString(),
			isMyMessage: true,
			messageType: "TEXT",
			unreadCountForSender: 1,
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
		leaveMutation.mutate(Number(roomId), { onSuccess: onLeaveSuccess });
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
