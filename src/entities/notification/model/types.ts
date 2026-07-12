export type NotificationType =
	| "PARTNER_PROPOSAL"
	| "PARTNER_SUGGESTION"
	| "ORDER"
	| "CHAT";

export interface Notification {
	id: number;
	type: NotificationType;
	refId: number;
	title: string;
	messagePreview: string;
	deeplink: string;
	createdAt: string;
	readAt: string | null;
	timeAgo: string;
	read: boolean;
}

export interface NotificationListResult {
	items: Notification[];
	page: number;
	size: number;
	totalPages: number;
	totalElements: number;
}
