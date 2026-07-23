import type { UserType } from "@/entities/user/model/types";

export type NotificationRole = Extract<UserType, "ADMIN" | "PARTNER">;

export interface NotificationItem {
	key: string;
	label: string;
}

export interface NotificationGroup {
	parent: NotificationItem;
	children: NotificationItem[];
}
