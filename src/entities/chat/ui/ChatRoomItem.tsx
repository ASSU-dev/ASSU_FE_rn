import { Text, View } from "react-native";

import { ProfileAvatar } from "@/shared/ui";

import type { ChatRoomItemProps } from "../model/types";

export function ChatRoomItem({
	profileImage,
	roomName,
	lastMessage,
	unreadCount = 0,
}: ChatRoomItemProps) {
	return (
		<View className="w-full flex-row items-center justify-between px-[10px] gap-[27px]">
			{/* Left: profile + texts */}
			<View className="flex-row shrink items-center gap-[27px]">
				<ProfileAvatar source={profileImage} size={48} />

				{/* Text area */}
				<View className="shrink">
					<Text
						className="font-bold text-[16px] leading-[22px]  text-content-primary"
						numberOfLines={1}
					>
						{roomName}
					</Text>
					<Text
						className="font-regular text-[13px] leading-[22px] tracking-[-0.41px] text-content-secondary"
						numberOfLines={1}
					>
						{lastMessage}
					</Text>
				</View>
			</View>

			{/* Right: unread count badge */}
			{unreadCount > 0 && (
				<View className="rounded-full bg-primary justify-center px-[8px]">
					<Text className="font-regular text-[12px] leading-[22px] tracking-[-0.41px] text-white">
						{unreadCount}
					</Text>
				</View>
			)}
		</View>
	);
}
