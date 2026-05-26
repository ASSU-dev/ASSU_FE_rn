import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatMessageComposer } from "@/features/send-message";

import type { ChatRoomWidgetProps } from "../model/types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";

export function ChatMessages({
	roomName,
	messages,
	currentUserId,
	partnerProfileImage,
	onSend,
	headerActions,
	onBack,
}: ChatRoomWidgetProps) {
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
