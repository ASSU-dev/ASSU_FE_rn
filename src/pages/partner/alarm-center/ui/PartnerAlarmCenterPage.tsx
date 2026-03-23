import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import type { Notification } from "@/entities/notification/model/types";
import { NotificationItem } from "@/entities/notification/ui/NotificationItem";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout";
import { TabBar } from "@/shared/ui/TabBar";

// TODO: features/view-notifications 구현 후 실제 API 데이터로 교체
const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: "1",
		category: "제휴 건의",
		message: "새로운 제휴 건의가 도착했어요!",
		createdAt: new Date(Date.now() - 10 * 60 * 1000),
		isRead: true,
	},
	{
		id: "2",
		category: "제휴 제안",
		message: "역전할머니맥주 어쩌 숭실대점에서 제휴 제안이 왔어요!",
		createdAt: new Date(Date.now() - 60 * 60 * 1000),
		isRead: true,
	},
	{
		id: "3",
		category: "제휴 제안",
		message: "역전할머니맥주 숭실대점에서 제휴 제안이 왔어요! 역전할머니맥주",
		createdAt: new Date(Date.now() - 60 * 60 * 1000),
		isRead: false,
	},
	{
		id: "4",
		category: "제휴 제안",
		message: "역전할머니맥주 숭실대점에서 제휴 제안이 왔어요!",
		createdAt: new Date(Date.now() - 60 * 60 * 1000),
		isRead: false,
	},
];

const TABS = [
	{ id: "all", label: "전체" },
	{ id: "unread", label: "안읽음" },
];

export function PartnerAlarmCenterPage() {
	const [activeTab, setActiveTab] = useState("all");

	const filteredNotifications =
		activeTab === "unread"
			? MOCK_NOTIFICATIONS.filter((n) => !n.isRead)
			: MOCK_NOTIFICATIONS;

	return (
		<PageLayout contentContainerClassName="flex-1">
			<View className="flex-row items-center gap-2 px-screen-m py-4">
				<Pressable hitSlop={8} onPress={() => router.back()}>
					<BackArrowIcon
						width={24}
						height={24}
						color={colorTokens.contentPrimary}
					/>
				</Pressable>
				<Text className="text-lg font-semibold text-content-primary">
					알림
				</Text>
			</View>
			<TabBar
				tabs={TABS}
				activeTab={activeTab}
				onTabChange={setActiveTab}
			/>
			<FlatList
				data={filteredNotifications}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <NotificationItem notification={item} />}
			/>
		</PageLayout>
	);
}
