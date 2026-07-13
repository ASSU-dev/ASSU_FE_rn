import { Pressable, Text, View } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";
import { ProfileAvatar } from "@/shared/ui/profile";

import { getProfileImageUri } from "../lib/getProfileImageUri";
import type { ChatRoomItemProps } from "../model/types";

export function ChatRoomItem({
	opponentProfileImage,
	opponentName,
	lastMessage,
	unreadMessagesCount = 0,
	onPress,
}: ChatRoomItemProps) {
	const displayCount = unreadMessagesCount > 99 ? "99+" : unreadMessagesCount;
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
							<ProfileAvatar
								source={getProfileImageUri(opponentProfileImage)}
								size={48}
							/>
							{/* 텍스트 */}
							<View className="shrink">
								<Text className="font-bold text-[16px] leading-[22px] text-content-primary">
									{opponentName}
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
						{unreadMessagesCount > 0 && (
							<View className="rounded-full bg-primary justify-center px-[8px]">
								<Text className="font-regular text-[12px] leading-[22px] tracking-[-0.41px] text-content-inverse">
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
