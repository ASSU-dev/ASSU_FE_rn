import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { TabIcon } from "../model/tabConfig";

const ICON_SIZE = 22;

type BottomTabItemProps = TabIcon & {
	label: string;
	isActive: boolean;
	onPress: () => void;
};

export function BottomTabItem({
	label,
	isActive,
	onPress,
	...icon
}: BottomTabItemProps) {
	const color = isActive ? colorTokens.primary : colorTokens.contentTertiary;

	return (
		<Pressable
			onPress={onPress}
			className="flex-1 items-center justify-center"
			style={{ height: 48, paddingVertical: 7 }}
		>
			{icon.Icon ? (
				<icon.Icon width={ICON_SIZE} height={ICON_SIZE} color={color} />
			) : (
				<Ionicons
					name={isActive ? icon.activeIconName : icon.inactiveIconName}
					size={ICON_SIZE}
					color={color}
				/>
			)}
			<Text className="text-xs mt-1 font-semibold" style={{ color }}>
				{label}
			</Text>
		</Pressable>
	);
}
