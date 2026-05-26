import { useRouter } from "expo-router";
import { View } from "react-native";

import { ChatRoomList, MOCK_ADMIN_CHAT_ROOMS } from "@/entities/chat";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

export function AdminChatPage() {
	const router = useRouter();

	function handlePressRoom(id: string) {
		router.push(`/(protected)/admin/chat-room/${id}` as never);
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
			<ChatRoomList
				rooms={MOCK_ADMIN_CHAT_ROOMS}
				onPressRoom={handlePressRoom}
			/>
		</PageLayout>
	);
}
