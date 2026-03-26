import { useState } from "react";
import { FlatList } from "react-native";

import type { Notification } from "@/entities/notification/model/types";
import { NotificationItem } from "@/entities/notification/ui/NotificationItem";
import { TabBar } from "@/shared/ui/TabBar";

const TABS = [
	{ id: "all", label: "전체" },
	{ id: "unread", label: "안읽음" },
];

interface AlarmCenterSectionProps {
	notifications: Notification[];
}

export function AlarmCenterSection({ notifications }: AlarmCenterSectionProps) {
	const [activeTab, setActiveTab] = useState("all");

	const filteredNotifications =
		activeTab === "unread"
			? notifications.filter((n) => !n.isRead)
			: notifications;

	return (
		<>
			<TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
			<FlatList
				data={filteredNotifications}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <NotificationItem notification={item} />}
			/>
		</>
	);
}
