import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import type { Notification } from "../model/types";

interface NotificationItemProps {
	notification: Notification;
	onPress?: () => void;
}

export function NotificationItem({
	notification,
	onPress,
}: NotificationItemProps) {
	const { title, messagePreview, timeAgo, read } = notification;

	return (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center gap-1 px-screen-m py-gutter ${
				read ? "bg-canvas" : "bg-primary-tint"
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
						{title}
					</Text>
					<Text className="text-sm font-semibold text-content-secondary">
						{timeAgo}
					</Text>
				</View>
				<Text className="text-5 font-medium text-content-primary">
					{messagePreview}
				</Text>
			</View>
		</Pressable>
	);
}
