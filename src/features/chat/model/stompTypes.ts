export type ChatEventType = "MESSAGE" | "READ_RECEIPT";

export interface SendMessageResponseDTO {
	eventType: ChatEventType;
	messageId: number;
	roomId: number;
	senderId: number;
	receiverId: number;
	message: string;
	messageType: string;
	/** "yyyy-MM-dd HH:mm:ss" 형식 */
	sentAt: string;
	unreadCountForSender: number;
}

export interface ChatRoomUpdateDTO {
	roomId: number;
	lastMessage: string;
	/** LocalDateTime → ISO 8601 */
	lastMessageTime: string;
	unreadCount: number;
}

export interface ChatMessageRequestDTO {
	roomId: number;
	senderId: number;
	receiverId: number;
	message: string;
	/** "yyyy-MM-dd HH:mm:ss" 형식 */
	send_time: string;
	type: string;
}
