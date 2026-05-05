import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

interface Props {
	label: string;
	value: string;
	onChangeText: (v: string) => void;
	placeholder?: string;
}

export function UnderlineField({
	label,
	value,
	onChangeText,
	placeholder,
}: Props) {
	return (
		<View className="gap-[5px]">
			<Text className="text-[13px] text-content-secondary px-[15px]">
				{label}
			</Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={colorTokens.contentSecondary}
				className="text-[17px] text-content-primary px-[15px] py-[8px]"
				style={{ borderBottomWidth: 0.5, borderBottomColor: "#e0e0e0" }}
			/>
		</View>
	);
}
