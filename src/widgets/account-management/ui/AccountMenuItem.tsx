import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";

import type { AccountMenuItemProps } from "../model/types";

export function AccountMenuItem({
	label,
	iconName,
	onPress,
}: AccountMenuItemProps) {
	return (
		<Pressable
			onPress={onPress}
			disabled={!onPress}
			className="flex-row items-center gap-3 rounded-2xl bg-canvas px-4 py-4"
		>
			<Ionicons name={iconName} size={20} color={colorTokens.contentSecondary} />
			<Text className="flex-1 text-[15px] font-medium text-content-primary">
				{label}
			</Text>
		</Pressable>
	);
}
