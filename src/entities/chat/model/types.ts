import type { ImageSource } from "expo-image";

export interface ChatRoomItemProps {
	roomId?: number;
	opponentId?: number;
	opponentName?: string;
	opponentProfileImage?: string;
	lastMessage?: string;
	unreadMessagesCount?: number;
	onPress?: () => void;
}

export interface Message {
	messageId?: number;
	message?: string;
	/** ISO 8601 형식 */
	sendTime?: string;
	unreadCountForSender?: number;
	isRead?: boolean;
	isMyMessage?: boolean;
	messageType?: "TEXT" | "PROPOSAL" | "SYSTEM" | "GUIDE";
}

export interface MessageItemProps {
	message: Message;
	isMyMessage: boolean;
	/** received 메시지일 때만 필요 */
	profileImage?: ImageSource;
}
