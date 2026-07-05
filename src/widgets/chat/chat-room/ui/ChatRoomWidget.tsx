import * as Crypto from "expo-crypto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
	getProfileImageUri,
	type Message,
	MOCK_ADMIN_CHAT_ROOMS,
	MOCK_PARTNER_CHAT_ROOMS,
} from "@/entities/chat";
import { ChatMessageComposer } from "@/features/send-message";
import { formatChatTime } from "@/shared/lib/formatTime";

import { MOCK_CHAT_MESSAGES } from "../model/mockMessages";
import { ChatHeader } from "./ChatHeader";
import { ChatHeaderActions } from "./ChatHeaderActions";
import { ChatMessageList } from "./ChatMessageList";

// TODO: API 연동 후 제거
const MOCK_ROOMS = [...MOCK_PARTNER_CHAT_ROOMS, ...MOCK_ADMIN_CHAT_ROOMS];

// TODO: auth store에서 조회
const MOCK_CURRENT_USER_ID = "partner-1";

export function ChatRoomWidget() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	// TODO: API 연동 후 id로 서버 조회, room이 없는 경우 router.back() 처리 필요
	const room = MOCK_ROOMS.find((r) => r.id === id);
	const profileImage = getProfileImageUri(room?.profileImage);

	const [messages, setMessages] = useState<Message[]>(MOCK_CHAT_MESSAGES);

	function handleSend(text: string) {
		setMessages((prev) => [
			{
				id: Crypto.randomUUID(),
				text,
				senderId: MOCK_CURRENT_USER_ID,
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
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<KeyboardAvoidingView behavior="padding" className="flex-1">
				<ChatHeader
					roomName={room?.roomName ?? "채팅방"}
					onBack={() => router.back()}
					actions={
						<ChatHeaderActions
							partnerName={room?.roomName ?? ""}
							onBlock={handleBlock}
							onLeave={handleLeave}
						/>
					}
				/>
				<ChatMessageList
					messages={messages}
					currentUserId={MOCK_CURRENT_USER_ID}
					partnerProfileImage={profileImage}
				/>
				<ChatMessageComposer onSend={handleSend} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
