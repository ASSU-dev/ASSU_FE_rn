import type { NotificationGroup, NotificationRole } from "./types";

export const NOTIFICATION_ITEMS: Record<NotificationRole, NotificationGroup> = {
	PARTNER: {
		parent: { key: "PUSH", label: "PUSH 알림" },
		children: [
			{ key: "CHAT", label: "채팅 알림" },
			{ key: "ORDER", label: "주문안내 알림" },
		],
	},
	ADMIN: {
		parent: { key: "PUSH", label: "PUSH 알림" },
		children: [
			{ key: "PARTNER_SUGGESTION", label: "제휴건의 알림" },
			{ key: "PARTNER_PROPOSAL", label: "제휴제안 알림" },
			{ key: "CHAT", label: "채팅 알림" },
		],
	},
};
