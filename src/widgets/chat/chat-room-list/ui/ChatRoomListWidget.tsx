import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ChatRoomItem } from "@/entities/chat";
import { useChatListWebSocket } from "@/features/chat/model/useChatListWebSocket";
import { useChatRoomList } from "@/features/chat/model/useChatRoomList";
import { useAuthStore } from "@/shared/lib/auth/authStore";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

type UserType = "PARTNER" | "ADMIN";

const CHAT_ROOM_ROUTE: Record<UserType, string> = {
	PARTNER: "/(protected)/partner/chat-room",
	ADMIN: "/(protected)/admin/chat-room",
};

const EMPTY_DESCRIPTION: Record<UserType, string> = {
	PARTNER: "제휴 협력을 원하는 학생회의 채팅을\n 받을 수 있어요!",
	ADMIN: "제휴 협력을 원하는 매장에 채팅을\n시도 할 수 있어요!",
};

interface ChatRoomListWidgetProps {
	userType: UserType;
}

export function ChatRoomListWidget({ userType }: ChatRoomListWidgetProps) {
	const router = useRouter();
	const userId = useAuthStore((state) => state.memberId);
	const { rooms, isLoading, isError } = useChatRoomList();
	useChatListWebSocket(userId);

	function handlePressRoom(roomId: number | undefined) {
		router.push(`${CHAT_ROOM_ROUTE[userType]}/${roomId}` as never);
	}

	if (isLoading) {
		return (
			<PageLayout
				withTopInset={true}
				withBottomInset={false}
				className="flex-1 bg-canvas"
				contentContainerClassName="flex-1 pt-6 items-center justify-center"
			>
				<ActivityIndicator />
			</PageLayout>
		);
	}

	if (isError) {
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
				<EmptyState
					title="채팅 목록을 불러오지 못했어요"
					description="잠시 후 다시 시도해 주세요."
				/>
			</PageLayout>
		);
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
				keyExtractor={(item) => String(item.roomId)}
				getItemLayout={(_, index) => ({
					length: 70,
					offset: 70 * index,
					index,
				})}
				renderItem={({ item }) => (
					<ChatRoomItem
						{...item}
						onPress={() => handlePressRoom(item.roomId)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						title="아직 채팅 내역이 없어요"
						description={EMPTY_DESCRIPTION[userType]}
					/>
				}
			/>
		</PageLayout>
	);
}
