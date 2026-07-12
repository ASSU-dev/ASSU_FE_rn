import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { NotificationItem } from "@/entities/notification/ui/NotificationItem";
import { TabBar } from "@/shared/ui/TabBar";

import { useMarkReadMutation } from "../api/useMarkReadMutation";
import { useNotificationsQuery } from "../api/useNotificationsQuery";

const TABS = [
	{ id: "all", label: "전체" },
	{ id: "unread", label: "안읽음" },
];

export function NotificationSection() {
	const [activeTab, setActiveTab] = useState("all");
	const { data: notifications = [], isLoading } = useNotificationsQuery();
	const { mutate: markRead } = useMarkReadMutation();

	const filtered =
		activeTab === "unread"
			? notifications.filter((n) => !n.read)
			: notifications;

	return (
		<>
			<TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
			{isLoading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			) : (
				<FlatList
					data={filtered}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<NotificationItem
							notification={item}
							onPress={() => {
								if (!item.read) markRead(item.id);
							}}
						/>
					)}
				/>
			)}
		</>
	);
}
