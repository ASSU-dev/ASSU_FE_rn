import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatMessageComposer } from "@/features/send-message";

import { useChatRoom } from "../model/useChatRoom";
import { ChatHeader } from "./ChatHeader";
import { ChatHeaderActions } from "./ChatHeaderActions";
import { ChatMessageList } from "./ChatMessageList";

export function ChatRoomWidget() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	const {
		roomName,
		profileImage,
		messages,
		handleSend,
		handleBlock,
		handleLeave,
	} = useChatRoom(id, () => router.back());

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<KeyboardAvoidingView behavior="padding" className="flex-1">
				<ChatHeader
					roomName={roomName}
					onBack={() => router.back()}
					actions={
						<ChatHeaderActions
							partnerName={roomName}
							onBlock={handleBlock}
							onLeave={handleLeave}
						/>
					}
				/>
				<ChatMessageList
					messages={messages}
					partnerProfileImage={profileImage}
				/>
				<ChatMessageComposer onSend={handleSend} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
