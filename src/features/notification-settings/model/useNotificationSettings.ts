import { useState } from "react";

import { NOTIFICATION_ITEMS } from "./notificationItems";
import type { NotificationGroup, NotificationRole } from "./types";

export function useNotificationSettings(role: NotificationRole) {
	const { parent, children }: NotificationGroup = NOTIFICATION_ITEMS[role];

	const [childSettings, setChildSettings] = useState<Record<string, boolean>>(
		() => Object.fromEntries(children.map((item) => [item.key, true])),
	);

	const isPushEnabled = Object.values(childSettings).some(Boolean);

	const togglePush = () => {
		const next = !isPushEnabled;
		setChildSettings(
			Object.fromEntries(children.map((item) => [item.key, next])),
		);
	};

	const toggleChild = (key: string) => {
		setChildSettings((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return {
		parent,
		children,
		childSettings,
		isPushEnabled,
		togglePush,
		toggleChild,
	};
}
