import type { ChatRoomItemProps } from "@/entities/chat";

export const MOCK_PARTNER_CHAT_ROOMS: ChatRoomItemProps[] = [
	{
		id: "1",
		profileImage: { uri: "https://picsum.photos/seed/admin1/48" },
		roomName: "ASSU 운영진",
		lastMessage: "제휴 조건 검토 중입니다.",
		unreadCount: 2,
	},
	{
		id: "2",
		profileImage: { uri: "https://picsum.photos/seed/admin2/48" },
		roomName: "ASSU 관리자",
		lastMessage: "확인했습니다. 감사합니다!",
		unreadCount: 0,
	},
];
