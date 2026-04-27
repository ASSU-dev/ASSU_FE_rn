import type { ImageSource } from "expo-image";

import type { Message } from "@/entities/chat";

export interface ChatRoomWidgetProps {
	messages: Message[];
	currentUserId: string;
	partnerProfileImage?: ImageSource;
	onSend: (text: string) => void;
}

export interface ChatHeaderActionsProps {
	partnerName: string;
	onBlock: () => void;
	onLeave: () => void;
}
