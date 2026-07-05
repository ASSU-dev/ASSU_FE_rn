import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import type { ChatRoomItemProps } from "@/entities/chat";
import {
	ChatRoomItem,
	MOCK_ADMIN_CHAT_ROOMS,
	MOCK_PARTNER_CHAT_ROOMS,
} from "@/entities/chat";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

type UserType = "PARTNER" | "ADMIN";

interface ChatConfig {
	rooms: ChatRoomItemProps[];
	emptyDescription: string;
	chatRoomRoute: string;
}

const CHAT_CONFIG: Record<UserType, ChatConfig> = {
	PARTNER: {
		rooms: MOCK_PARTNER_CHAT_ROOMS,
		emptyDescription: "제휴 협력을 원하는 학생회의 채팅을\n 받을 수 있어요!",
		chatRoomRoute: "/(protected)/partner/chat-room",
	},
	ADMIN: {
		rooms: MOCK_ADMIN_CHAT_ROOMS,
		emptyDescription: "제휴 협력을 원하는 매장에 채팅을\n시도 할 수 있어요!",
		chatRoomRoute: "/(protected)/admin/chat-room",
	},
};

interface ChatRoomListWidgetProps {
	userType: UserType;
}

export function ChatRoomListWidget({ userType }: ChatRoomListWidgetProps) {
	const router = useRouter();
	const { rooms, emptyDescription, chatRoomRoute } = CHAT_CONFIG[userType];

	function handlePressRoom(id: string) {
		router.push(`${chatRoomRoute}/${id}` as never);
	}

	return (
		<PageLayout
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-canvas"
			contentContainerClassName="flex-1 pt-6"
		>
			<View className="px-6">
				<PageTitle title="채팅 내역" />
			</View>
			<FlatList
				data={rooms}
				keyExtractor={(item) => item.id}
				getItemLayout={(_, index) => ({
					length: 70,
					offset: 70 * index,
					index,
				})}
				renderItem={({ item }) => (
					<ChatRoomItem {...item} onPress={() => handlePressRoom(item.id)} />
				)}
				ListEmptyComponent={
					<EmptyState
						title="아직 채팅 내역이 없어요"
						description={emptyDescription}
					/>
				}
			/>
		</PageLayout>
	);
}
