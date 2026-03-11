import { Text, View } from "react-native";

import { ProfileAvatar } from "@/shared/ui/profile";

import type { AccountProfileHeaderProps } from "../model/types";

export function AccountProfileHeader({
	name,
	subtitle,
	profileImage,
	avatarSize = 64,
}: AccountProfileHeaderProps) {
	return (
		<View className="flex-row items-center gap-4 rounded-3xl bg-canvas px-5 py-5">
			<ProfileAvatar source={profileImage} size={avatarSize} />
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
