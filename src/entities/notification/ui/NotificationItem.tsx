import { Image } from "expo-image";
import { Text, View } from "react-native";

import { formatTimeAgo } from "../lib/formatTimeAgo";
import type { Notification } from "../model/types";

interface NotificationItemProps {
	notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
	const { category, message, createdAt, isRead } = notification;

	return (
		<View
			className={`flex-row items-center gap-1 px-screen-m py-gutter ${
				isRead ? "bg-canvas" : "bg-primary-tint"
			}`}
		>
			<View className="h-[50px] w-[50px] items-center justify-center">
				<Image
					source={require("@/shared/assets/images/noti_profile.jpg")}
					style={{ width: 30, height: 30, borderRadius: 15 }}
					contentFit="cover"
				/>
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
				<Text className="text-5 font-medium text-content-primary">
					{message}
				</Text>
			</View>
		</View>
	);
}
