import * as Crypto from "expo-crypto";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	getProfileImageUri,
	type Message,
	MOCK_PARTNER_CHAT_ROOMS,
} from "@/entities/chat";
import { formatChatTime } from "@/shared/lib/formatTime";
import { ChatHeaderActions, ChatMessages } from "@/widgets/chat/chat-room";

import {
	MOCK_CHAT_MESSAGES,
	PARTNER_CURRENT_USER_ID,
} from "../model/mockMessages";

export function PartnerChatRoomPage() {
	const { id } = useLocalSearchParams<{ id: string }>();

	// TODO: Zustand 도입 후 store에서 조회
	// TODO: API 연동 후 room이 없는 경우(삭제된 채팅방, 잘못된 ID) router.back() 처리 필요
	const room = MOCK_PARTNER_CHAT_ROOMS.find((r) => r.id === id);
	const profileImage = getProfileImageUri(room?.profileImage);

	const [messages, setMessages] = useState<Message[]>(MOCK_CHAT_MESSAGES);

	function handleSend(text: string) {
		setMessages((prev) => [
			{
				id: Crypto.randomUUID(),
				text,
				senderId: PARTNER_CURRENT_USER_ID,
				sentAt: formatChatTime(),
			},
			...prev,
		]);
	}

	function handleBlock() {
		// TODO: 차단 API 연동
	}

	function handleLeave() {
		// TODO: 채팅방 나가기 API 연동
	}

	return (
		<ChatMessages
			roomName={room?.roomName ?? "채팅방"}
			messages={messages}
			currentUserId={PARTNER_CURRENT_USER_ID}
			partnerProfileImage={profileImage}
			onSend={handleSend}
			headerActions={
				<ChatHeaderActions
					partnerName={room?.roomName ?? ""}
					onBlock={handleBlock}
					onLeave={handleLeave}
				/>
			}
		/>
	);
}
