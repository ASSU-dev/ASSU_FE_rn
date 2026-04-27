import { Pressable, Text, View } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";
import { ProfileAvatar } from "@/shared/ui/profile";

import type { ChatRoomItemProps } from "../model/types";

export function ChatRoomItem({
	profileImage,
	roomName,
	lastMessage,
	unreadCount = 0,
	onPress,
}: ChatRoomItemProps) {
	const displayCount = unreadCount > 99 ? "99+" : unreadCount; // 100 이상은 "99+"로 표시
	return (
		<Pressable onPress={onPress} disabled={!onPress}>
			{({ pressed }) => (
				<View
					className="w-full h-[70px] justify-center"
					style={{ backgroundColor: pressed ? colorTokens.neutral : undefined }}
				>
					<View className="h-[48px] px-6 flex-row items-center justify-between gap-[27px]">
						{/* 프로필 + 텍스트 영역 */}
						<View className="ml-2 flex-row shrink items-center gap-[27px]">
							<ProfileAvatar source={{ uri: profileImage }} size={48} />
							{/* 텍스트 */}
							<View className="shrink">
								<Text className="font-bold text-[16px] leading-[22px] text-content-primary">
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

						{/* 안읽은 메세지 카운트 뱃지 */}
						{unreadCount > 0 && (
							<View className="rounded-full bg-primary justify-center px-[8px]">
								<Text className="font-regular text-[12px] leading-[22px] tracking-[-0.41px] text-white">
									{displayCount}
								</Text>
							</View>
						)}
					</View>
				</View>
			)}
		</Pressable>
	);
}
