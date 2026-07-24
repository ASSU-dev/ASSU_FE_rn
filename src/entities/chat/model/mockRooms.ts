import type { ChatRoomItemProps } from "./types";

export const MOCK_PARTNER_CHAT_ROOMS: ChatRoomItemProps[] = [
	{
		roomId: 1,
		opponentProfileImage: "https://picsum.photos/seed/admin1/48",
		opponentName: "ASSU 운영진",
		lastMessage: "제휴 조건 검토 중입니다.",
		unreadMessagesCount: 2,
	},
	{
		roomId: 2,
		opponentProfileImage: "https://picsum.photos/seed/admin2/48",
		opponentName: "ASSU 관리자",
		lastMessage: "확인했습니다. 감사합니다!",
		unreadMessagesCount: 0,
	},
];

export const MOCK_ADMIN_CHAT_ROOMS: ChatRoomItemProps[] = [
	{
		roomId: 1,
		opponentProfileImage: "https://picsum.photos/seed/store1/48",
		opponentName: "인쌩맥주 숭실대점",
		lastMessage: "제휴 협력 가능할까요?",
		unreadMessagesCount: 1,
	},
	{
		roomId: 2,
		opponentProfileImage: "https://picsum.photos/seed/store2/48",
		opponentName: "역전할머니맥주 숭실대점",
		lastMessage: "감사합니다..!",
		unreadMessagesCount: 200,
	},
	{
		roomId: 3,
		opponentProfileImage: "https://picsum.photos/seed/store3/48",
		opponentName: "리얼후라이",
		lastMessage: "잘 부탁드립니다",
		unreadMessagesCount: 0,
	},
];
