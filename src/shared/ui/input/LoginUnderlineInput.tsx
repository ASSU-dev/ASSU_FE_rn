import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

type LoginUnderlineInputProps = {
	label: string;
	value: string;
	placeholder?: string;
	onChangeText?: (text: string) => void;
	secureTextEntry?: boolean;
};

export function LoginUnderlineInput({
	label,
	value,
	placeholder,
	onChangeText,
	secureTextEntry = false,
}: LoginUnderlineInputProps) {
	return (
		<View>
			<Text className="text-[13px] pl-[15px] py-[5px] font-regular text-content-secondary">
				{label}
			</Text>
			<TextInput
				className="text-[17px] p-[15px] font-regular text-content-primary"
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={colorTokens.contentPrimaryAlpha45}
				secureTextEntry={secureTextEntry}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<View className="h-[0.5px] mx-[15px] bg-content-secondary" />
		</View>
	);
}
