import { Pressable, Text, View } from "react-native";

import { ImageUploadIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { ProfileAvatar } from "@/shared/ui/profile";

import type { AccountProfileHeaderProps } from "../model/types";

export function AccountProfileHeader({
	name,
	subtitle,
	profileImage,
	avatarSize = 64,
	onProfileImagePress,
}: AccountProfileHeaderProps) {
	return (
		<View className="flex-row items-center gap-4 rounded-3xl bg-canvas px-5 py-5">
			<Pressable
				disabled={!onProfileImagePress}
				onPress={onProfileImagePress}
				accessibilityRole={onProfileImagePress ? "button" : undefined}
				accessibilityLabel={
					onProfileImagePress ? "프로필 사진 수정" : undefined
				}
				className="relative"
			>
				<ProfileAvatar source={profileImage} size={avatarSize} />
				{onProfileImagePress ? (
					<View className="absolute -bottom-1 -right-1 h-7 w-7 items-center justify-center rounded-full border border-neutral-variant bg-canvas">
						<ImageUploadIcon
							width={14}
							height={14}
							fill={colorTokens.primary}
						/>
					</View>
				) : null}
			</Pressable>
			<View className="flex-1 gap-1">
				<Text className="text-xl font-semibold text-content-primary">
					{name}
				</Text>
				{subtitle ? (
					<Text className="text-sm font-regular text-content-secondary">
						{subtitle}
					</Text>
				) : null}
			</View>
		</View>
	);
}
