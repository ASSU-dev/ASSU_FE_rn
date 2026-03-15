export type NotificationCategory = "제휴 건의" | "제휴 제안";

export interface Notification {
	id: string;
	category: NotificationCategory;
	message: string;
	createdAt: Date;
	isRead: boolean;
}
