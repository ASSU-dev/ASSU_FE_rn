import type { ImageSource } from "expo-image";
import type { ReactNode } from "react";

import type { Message } from "@/entities/chat";

export interface ChatRoomWidgetProps {
	roomName: string;
	messages: Message[];
	currentUserId: string;
	partnerProfileImage?: ImageSource;
	onSend: (text: string) => void;
	headerActions?: ReactNode;
	onBack?: () => void;
}

export interface ChatHeaderActionsProps {
	partnerName: string;
	onBlock: () => void;
	onLeave: () => void;
}
