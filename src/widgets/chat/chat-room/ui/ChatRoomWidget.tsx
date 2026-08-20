import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatMessageComposer } from "@/features/send-message";

import { useChatRoom } from "../model/useChatRoom";
import { ChatHeader } from "./ChatHeader";
import { ChatHeaderActions } from "./ChatHeaderActions";
import { ChatMessageList } from "./ChatMessageList";

export function ChatRoomWidget() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { height } = useReanimatedKeyboardAnimation();
	const [keyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const show = Keyboard.addListener("keyboardDidShow", () =>
			setKeyboardVisible(true),
		);
		const hide = Keyboard.addListener("keyboardDidHide", () =>
			setKeyboardVisible(false),
		);
		return () => {
			show.remove();
			hide.remove();
		};
	}, []);

	const {
		roomName,
		profileImage,
		messages,
		handleSend,
		handleBlock,
		handleLeave,
	} = useChatRoom(id, () => router.back());

	const animatedStyle = useAnimatedStyle(() => ({
		paddingBottom: -height.value,
	}));

	return (
		<SafeAreaView
			edges={keyboardVisible ? ["top"] : ["top", "bottom"]}
			className="flex-1 bg-canvas"
		>
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
			<Animated.View style={[{ flex: 1 }, animatedStyle]}>
				<ChatMessageList
					messages={messages}
					partnerProfileImage={profileImage}
				/>
				<ChatMessageComposer onSend={handleSend} />
			</Animated.View>
		</SafeAreaView>
	);
}
