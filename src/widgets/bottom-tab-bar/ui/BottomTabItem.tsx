import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, Text } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface BottomTabItemProps {
	label: string;
	activeIconName: IoniconName;
	inactiveIconName: IoniconName;
	isActive: boolean;
	onPress: () => void;
}

export function BottomTabItem({
	label,
	activeIconName,
	inactiveIconName,
	isActive,
	onPress,
}: BottomTabItemProps) {
	const color = isActive ? colorTokens.primary : colorTokens.contentTertiary;
	const iconName = isActive ? activeIconName : inactiveIconName;

	return (
		<Pressable
			onPress={onPress}
			className="flex-1 items-center justify-center"
			style={{ height: 48, paddingVertical: 7 }}
		>
			<Ionicons name={iconName} size={22} color={color} />
			<Text className="text-xs mt-1 font-semibold" style={{ color }}>
				{label}
			</Text>
		</Pressable>
	);
}
