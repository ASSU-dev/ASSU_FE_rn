import type { ImageSource } from "expo-image";
import { useEffect, useRef } from "react";
import { FlatList, Text, View } from "react-native";

import { type Message, MessageItem } from "@/entities/chat";

interface ChatMessageListProps {
	messages: Message[];
	partnerProfileImage?: ImageSource;
}

export function ChatMessageList({
	messages,
	partnerProfileImage,
}: ChatMessageListProps) {
	const flatListRef = useRef<FlatList>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: messages.length is used as a scroll trigger, not a value dependency
	useEffect(() => {
		flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
	}, [messages.length]);

	return (
		<FlatList
			ref={flatListRef}
			style={{ flex: 1 }}
			data={messages}
			keyExtractor={(item, index) =>
				String(item.messageId ?? `${item.sendTime}-${index}`)
			}
			renderItem={({ item }) => (
				<MessageItem
					message={item}
					isMyMessage={item.isMyMessage ?? false}
					profileImage={
						!(item.isMyMessage ?? false) ? partnerProfileImage : undefined
					}
				/>
			)}
			inverted
			contentContainerStyle={{ flexGrow: 1, paddingTop: 8, paddingBottom: 16 }}
			ListHeaderComponent={() => <View style={{ flex: 1 }} />}
			ListHeaderComponentStyle={{ flex: 1 }}
			ListEmptyComponent={
				<Text className="mt-10 text-center text-content-tertiary">
					첫 메시지를 보내보세요
				</Text>
			}
		/>
	);
}
