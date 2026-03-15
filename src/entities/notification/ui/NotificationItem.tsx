import { SpeechBubbleIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
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

	if (diffMinutes < 60) return `${diffMinutes}분 전`;
	if (diffHours < 24) return `${diffHours}시간 전`;
	return `${diffDays}일 전`;
}

export function NotificationItem({ notification }: NotificationItemProps) {
	const { category, message, createdAt, isRead } = notification;

	return (
		<View
			className={`flex-row items-start gap-3 px-screen-m py-4 ${
				isRead ? "bg-canvas" : "bg-primary-tint"
			}`}
		>
			<View className="h-10 w-10 items-center justify-center rounded-full bg-primary">
				<SpeechBubbleIcon
					width={20}
					height={20}
					color={colorTokens.canvas}
				/>
			</View>
			<View className="flex-1 gap-1">
				<View className="flex-row items-center justify-between">
					<Text className="text-sm font-regular text-content-secondary">
						{category}
					</Text>
					<Text className="text-sm font-regular text-content-secondary">
						{formatTimeAgo(createdAt)}
					</Text>
				</View>
				<Text
					className="text-sm font-medium text-content-primary"
					numberOfLines={2}
				>
					{message}
				</Text>
			</View>
		</View>
	);
}
