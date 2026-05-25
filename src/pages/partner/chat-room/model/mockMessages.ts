import type { Message } from "@/entities/chat";

export const PARTNER_CURRENT_USER_ID = "partner-1";

export const MOCK_CHAT_MESSAGES: Message[] = [
	{
		id: "3",
		text: "네 있습니다!",
		senderId: "admin-1",
		sentAt: "17:59",
	},
	{
		id: "2",
		text: "혹시 생각하신 내용 있을까요?",
		senderId: "partner-1",
		sentAt: "17:22",
	},
	{
		id: "1",
		text: "제휴 협력 요청 드리고 싶습니다!",
		senderId: "admin-1",
		sentAt: "17:22",
	},
];
