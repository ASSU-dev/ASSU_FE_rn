import type { ChatRoomItemProps } from "@/entities/chat";

export const MOCK_ADMIN_CHAT_ROOMS: ChatRoomItemProps[] = [
	{
		id: "1",
		profileImage: { uri: "https://picsum.photos/seed/store1/48" },
		roomName: "인쌩맥주 숭실대점",
		lastMessage: "제휴 협력 가능할까요?",
		unreadCount: 1,
	},
	{
		id: "2",
		profileImage: { uri: "https://picsum.photos/seed/store2/48" },
		roomName: "역전할머니맥주 숭실대점",
		lastMessage: "감사합니다..!",
		unreadCount: 200,
	},
	{
		id: "3",
		profileImage: { uri: "https://picsum.photos/seed/store3/48" },
		roomName: "리얼후라이",
		lastMessage: "잘 부탁드립니다",
		unreadCount: 0,
	},
];
