import { Pressable, Text, View } from "react-native";
import { CheckIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

type AddressSearchOptionRowProps = {
	label: string;
	selected: boolean;
	showDivider: boolean;
	onPress: () => void;
};

export function AddressSearchOptionRow({
	label,
	selected,
	showDivider,
	onPress,
}: AddressSearchOptionRowProps) {
	return (
		<Pressable
			onPress={onPress}
			className="flex-row items-center justify-between px-[10px] py-[14px]"
			style={{
				borderBottomWidth: showDivider ? 0.5 : 0,
				borderBottomColor: colorTokens.neutralVariant,
			}}
		>
			<Text
				className={
					selected
						? "text-[14px] leading-[18px] text-primary"
						: "text-[14px] leading-[18px] text-content-primary"
				}
			>
				{label}
			</Text>
			{selected ? <CheckIcon width={18} height={18} /> : <View className="w-[18px]" />}
		</Pressable>
	);
}
