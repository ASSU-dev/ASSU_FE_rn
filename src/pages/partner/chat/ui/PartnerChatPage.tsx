import { ChatRoomList } from "@/entities/chat";
import { PageLayout } from "@/shared/ui/layout";
import { PageTitle } from "@/shared/ui/page-title";

import { MOCK_PARTNER_CHAT_ROOMS } from "../model/mockChatRooms";

export function PartnerChatPage() {
	return (
		<PageLayout contentContainerClassName="flex-1">
			<PageTitle title="채팅 내역" />
			<ChatRoomList rooms={MOCK_PARTNER_CHAT_ROOMS} />
		</PageLayout>
	);
}
