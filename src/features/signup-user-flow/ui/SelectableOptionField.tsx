import { Pressable, Text } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

type SelectableOptionFieldProps = {
	label: string;
	selected?: boolean;
	hasSelection?: boolean;
	onPress: () => void;
};

export function SelectableOptionField({
	label,
	selected = false,
	hasSelection = false,
	onPress,
}: SelectableOptionFieldProps) {
	return (
		<Pressable
			onPress={onPress}
			className="h-[50px] w-full justify-center rounded-lg border border-[0.5px] px-[15px]"
			style={{
				borderColor: selected ? colorTokens.primary : colorTokens.neutral,
				backgroundColor: colorTokens.neutral,
			}}
		>
			<Text
				className={
					selected || !hasSelection
						? "text-[17px] font-medium text-content-secondary"
						: "text-[17px] font-regular text-content-tertiary"
				}
			>
				{label}
			</Text>
		</Pressable>
	);
}
