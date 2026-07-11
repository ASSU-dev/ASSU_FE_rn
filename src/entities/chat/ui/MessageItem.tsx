import { Text, View } from "react-native";

import { formatChatTime } from "@/shared/lib/formatTime";
import { ProfileAvatar } from "@/shared/ui/profile";

import type { MessageItemProps } from "../model/types";
import { MessageBubble } from "./MessageBubble";
import { MessageTime } from "./MessageTime";

export function MessageItem({
	message,
	isMyMessage,
	profileImage,
}: MessageItemProps) {
	const variant = isMyMessage ? "sent" : "received";
	const timeText = message.sendTime
		? formatChatTime(new Date(message.sendTime))
		: "";

	const unread = (message.unreadCountForSender ?? 1) > 0;

	if (isMyMessage) {
		return (
			<View className="flex-row justify-end items-end gap-[6px] px-screen-m mb-5">
				<View className="items-end">
					{unread && (
						<Text className="text-xs text-primary font-medium">1</Text>
					)}
					<MessageTime time={timeText} variant={variant} />
				</View>
				{/* shrink: 버블이 시간 텍스트를 밀어내지 않도록 압축 허용 */}
				<View className="shrink items-end">
					<MessageBubble text={message.message ?? ""} variant={variant} />
				</View>
			</View>
		);
	}

	return (
		<View className="flex-row items-center items-end gap-[10px] px-screen-m mb-5">
			<ProfileAvatar source={profileImage} size={47} />
			{/* flex-1: 아바타 이후 남은 공간을 정확히 파악해 버블+시간이 넘치지 않게 함 */}
			<View className="flex-1 flex-row items-end gap-[6px]">
				<View className="shrink">
					<MessageBubble text={message.message ?? ""} variant={variant} />
				</View>
				<View className="items-start">
					{unread && (
						<Text className="text-xs text-primary font-medium">1</Text>
					)}
					<MessageTime time={timeText} variant={variant} />
				</View>
			</View>
		</View>
	);
}
