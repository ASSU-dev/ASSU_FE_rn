import type { ImageSource } from "expo-image";

export interface ChatRoomItemProps {
	id: string;
	profileImage: ImageSource;
	roomName: string;
	lastMessage: string;
	unreadCount?: number;
	onPress?: () => void;
}

export interface Message {
	id: string;
	text: string;
	senderId: string;
	/** "HH:mm" 포맷 */
	sentAt: string;
}

export interface MessageItemProps {
	message: Message;
	isMine: boolean;
	/** received 메시지일 때만 필요 */
	profileImage?: ImageSource;
}
