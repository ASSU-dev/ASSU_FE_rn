import type { Message } from "@/entities/chat";

export const MOCK_CHAT_MESSAGES: Message[] = [
	{
		messageId: 3,
		message: "네 있습니다!",
		sendTime: new Date().toISOString(),
		isMyMessage: false,
		messageType: "TEXT",
	},
	{
		messageId: 2,
		message: "혹시 생각하신 내용 있을까요?",
		sendTime: new Date().toISOString(),
		isMyMessage: true,
		messageType: "TEXT",
	},
	{
		messageId: 1,
		message: "제휴 협력 요청 드리고 싶습니다!",
		sendTime: new Date().toISOString(),
		isMyMessage: false,
		messageType: "TEXT",
	},
];
