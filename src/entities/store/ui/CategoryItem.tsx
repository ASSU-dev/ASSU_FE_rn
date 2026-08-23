import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";
import { colorTokens } from "@/shared/styles/tokens";

interface CategoryItemProps {
	icon: React.ComponentType<SvgProps>;
	label: string;
	onPress?: () => void;
}

export function CategoryItem({
	icon: Icon,
	label,
	onPress,
}: CategoryItemProps) {
	return (
		<Pressable onPress={onPress} className="flex-1 items-center gap-1.5">
			<View
				className="items-center justify-center border border-neutral-variant rounded-[21px]"
				style={{ width: 54, height: 54 }}
			>
				<Icon width={26} height={26} color={colorTokens.primary} />
			</View>
			<Text className="font-regular text-[12px] text-content-primary text-center">
				{label}
			</Text>
		</Pressable>
	);
}
