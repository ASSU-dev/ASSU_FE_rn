import { Pressable, Text } from "react-native";
import { CheckFillIcon, CheckNoneIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import type { CheckboxProps } from "./types";

export function Checkbox({
	checked,
	label,
	showDivider = false,
	onPress,
}: CheckboxProps) {
	return (
		<Pressable
			accessibilityRole="checkbox"
			accessibilityState={{ checked }}
			onPress={onPress}
			className="w-full flex-row items-center gap-[10px] p-[15px]"
			style={{
				borderBottomWidth: showDivider ? 1 : 0,
				borderBottomColor: colorTokens.neutralVariant,
			}}
		>
			{checked ? (
				<CheckFillIcon width={16} height={16} />
			) : (
				<CheckNoneIcon width={16} height={16} />
			)}

			<Text
				className="flex-1 text-[17px]"
				style={{ color: colorTokens.contentPrimary }}
			>
				{label}
			</Text>
		</Pressable>
	);
}
