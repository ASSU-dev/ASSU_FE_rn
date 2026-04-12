import { View } from "react-native";
import { ChatRoomList } from "@/entities/chat";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

import { MOCK_PARTNER_CHAT_ROOMS } from "../model/mockChatRooms";

export function PartnerChatPage() {
	return (
		<PageLayout
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-canvas"
			contentContainerClassName="flex-1 px-6 pt-6"
		>
			<View className="px-6">
				<PageTitle title="채팅 내역" />
			</View>
			<ChatRoomList rooms={MOCK_PARTNER_CHAT_ROOMS} />
		</PageLayout>
	);
}
