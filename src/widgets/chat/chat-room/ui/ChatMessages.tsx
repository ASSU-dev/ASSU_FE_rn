import type { ImageSource } from "expo-image";
import type { ReactNode } from "react";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Message } from "@/entities/chat";
import { ChatMessageComposer } from "@/features/send-message";

import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";

interface ChatMessagesProps {
	roomName: string;
	messages: Message[];
	currentUserId: string;
	partnerProfileImage?: ImageSource;
	onSend: (text: string) => void;
	headerActions?: ReactNode;
	onBack?: () => void;
}

export function ChatMessages({
	roomName,
	messages,
	currentUserId,
	partnerProfileImage,
	onSend,
	headerActions,
	onBack,
}: ChatMessagesProps) {
	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<KeyboardAvoidingView behavior="padding" className="flex-1">
				<ChatHeader
					roomName={roomName}
					onBack={onBack}
					actions={headerActions}
				/>
				<ChatMessageList
					messages={messages}
					currentUserId={currentUserId}
					partnerProfileImage={partnerProfileImage}
				/>
				<ChatMessageComposer onSend={onSend} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
