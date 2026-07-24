import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

export function NotificationHeader() {
	return (
		<View className="flex-row items-center gap-5 px-screen-m pt-7 pb-4">
			<Pressable hitSlop={8} onPress={() => router.back()}>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
			<Text className="text-lg font-semibold text-content-primary">알림</Text>
		</View>
	);
}
