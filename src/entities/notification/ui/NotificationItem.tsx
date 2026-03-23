import { NotiProfileIcon } from "@/shared/assets/icons";
import { Text, View } from "react-native";

import type { Notification } from "../model/types";

interface NotificationItemProps {
	notification: Notification;
}

function formatTimeAgo(date: Date): string {
	const diffMs = Date.now() - date.getTime();
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMinutes < 1) return "방금 전";
	if (diffMinutes < 60) return `${diffMinutes}분 전`;
	if (diffHours < 24) return `${diffHours}시간 전`;
	return `${diffDays}일 전`;
}

export function NotificationItem({ notification }: NotificationItemProps) {
	const { category, message, createdAt, isRead } = notification;

	return (
		<View
			className={`flex-row items-center gap-1 px-screen-m py-gutter ${
				isRead ? "bg-canvas" : "bg-primary-tint"
			}`}
		>
			<View className="h-[50px] w-[50px] items-center justify-center" >
				<NotiProfileIcon height={30} width={30} />
			</View>
			<View className="flex-1 gap-1">
				<View className="flex-row items-center justify-between">
					<Text className="text-sm font-regular text-content-secondary">
						{category}
					</Text>
					<Text className="text-sm font-semibold text-content-secondary">
						{formatTimeAgo(createdAt)}
					</Text>
				</View>
				<Text
					className="text-5 font-medium text-content-primary"
				>
					{message}
				</Text>
			</View>
		</View>
	);
}
