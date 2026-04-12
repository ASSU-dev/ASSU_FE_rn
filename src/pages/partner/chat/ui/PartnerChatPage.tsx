import { View } from "react-native";
import { ChatRoomList } from "@/entities/chat";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

import { MOCK_PARTNER_CHAT_ROOMS } from "../model/mockChatRooms";

// PageLayout에 px-6을 적용하지 않은 이유: 디자인 상 채팅방 아이템이 화면 양 끝까지 닿아야 하기 때문
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
