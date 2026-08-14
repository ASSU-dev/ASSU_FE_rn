import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { PasswordVisibilityToggle } from "./PasswordVisibilityToggle";

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
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const isSecureText = Boolean(secureTextEntry);

	return (
		<View>
			<Text className="text-[13px] pl-[15px] py-[5px] font-regular text-content-secondary">
				{label}
			</Text>
			<View className="flex-row items-center px-[15px]">
				<TextInput
					className="flex-1 py-[15px] text-[17px] font-regular text-content-primary"
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={colorTokens.contentPrimaryAlpha45}
					secureTextEntry={isSecureText && !isPasswordVisible}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				{isSecureText ? (
					<PasswordVisibilityToggle
						visible={isPasswordVisible}
						onPress={() => setPasswordVisible((current) => !current)}
					/>
				) : null}
			</View>
			<View className="h-[0.5px] mx-[15px] bg-content-secondary" />
		</View>
	);
}
