import { useState } from "react";
import { TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { PasswordVisibilityToggle } from "../input/PasswordVisibilityToggle";
import type { FormFieldAppearance, FormFieldInputProps } from "./types";

//formField가 크게 두가지 버전으로 존재함.
const APPEARANCE_STYLES: Record<
	FormFieldAppearance,
	{ backgroundColor: string; borderColor: string }
> = {
	filled: {
		backgroundColor: colorTokens.neutral,
		borderColor: colorTokens.neutral,
	},
	outlined: {
		backgroundColor: colorTokens.canvas,
		borderColor: colorTokens.contentSecondary,
	},
};

export function FormFieldInput({
	appearance = "filled",
	fontSize = 17,
	inputBackgroundColor,
	inputBorderColor,
	inputTextColor,
	inputStyle,
	rightElement,
	multiline,
	hasError,
	onFocus,
	onBlur,
	...props
}: FormFieldInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const isSecureText = Boolean(props.secureTextEntry);

	const baseStyle = APPEARANCE_STYLES[appearance];

	const borderColor = hasError
		? colorTokens.danger
		: isFocused
			? colorTokens.primary
			: baseStyle.borderColor;

	const finalBackgroundColor = inputBackgroundColor
		? colorTokens[inputBackgroundColor]
		: baseStyle.backgroundColor;

	const finalTextColor = inputTextColor
		? colorTokens[inputTextColor]
		: colorTokens.contentPrimary;

	return (
		<View
			className="flex-row items-center rounded-lg px-[15px] border"
			style={{
				backgroundColor: finalBackgroundColor,
				borderColor: inputBorderColor
					? colorTokens[inputBorderColor]
					: borderColor,
				borderWidth: 0.5,
				minHeight: 50,
				height: multiline ? undefined : 50,
			}}
		>
			<TextInput
				{...props}
				multiline={multiline}
				underlineColorAndroid="transparent"
				className="flex-1"
				style={[
					{
						fontSize,
						color: finalTextColor,
						textAlignVertical: multiline ? "top" : "center",
					},
					inputStyle,
				]}
				placeholderTextColor={colorTokens.contentSecondary}
				secureTextEntry={isSecureText && !isPasswordVisible}
				onFocus={(e) => {
					setIsFocused(true);
					onFocus?.(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					onBlur?.(e);
				}}
			/>

			{isSecureText ? (
				<View className="ml-2">
					<PasswordVisibilityToggle
						visible={isPasswordVisible}
						onPress={() => setPasswordVisible((current) => !current)}
					/>
				</View>
			) : rightElement ? (
				<View className="ml-2">{rightElement}</View>
			) : null}
		</View>
	);
}
