import type { UserType } from "@/entities/user/model/types";

export type NotificationRole = Extract<UserType, "ADMIN" | "PARTNER">;

export type NotificationType =
	| "CHAT"
	| "PARTNER_SUGGESTION"
	| "PARTNER_PROPOSAL"
	| "ORDER"
	| "PARTNER_ALL"
	| "ADMIN_ALL"
	| "STAMP";

export interface NotificationItem {
	key: NotificationType;
	label: string;
}

export interface NotificationGroup {
	parent: NotificationItem;
	children: NotificationItem[];
}
