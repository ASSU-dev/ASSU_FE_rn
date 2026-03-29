import type { ReactNode } from "react";
import type {
	Control,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import type { TextInputProps } from "react-native";
import type { colorTokens } from "@/shared/styles/tokens";

export type ColorTokenKey = keyof typeof colorTokens;

/**
 * 텍스트필드 스타일 타입 (크게 두가지 있음)
 */
export type FormFieldAppearance = "filled" | "outlined";

export type FormFieldProps<T extends FieldValues> = TextInputProps & {
	control: Control<T>;
	name: Path<T>;
	rules?: RegisterOptions<T, Path<T>>;

	label?: string;
	helperText?: string;

	appearance?: FormFieldAppearance;

	labelColor?: ColorTokenKey;

	rightElement?: ReactNode;

	fontSize?: number;
	inputStyle?: TextInputProps["style"];

	// 커스텀 스타일 오버라이드
	inputBackgroundColor?: ColorTokenKey;
	inputBorderColor?: ColorTokenKey;
	inputTextColor?: ColorTokenKey;
};

// Input Props
export type FormFieldInputProps = TextInputProps & {
	appearance: FormFieldAppearance;

	fontSize?: number;
	rightElement?: ReactNode;

	hasError?: boolean;

	// 커스텀 스타일 오버라이드
	inputBackgroundColor?: ColorTokenKey;
	inputBorderColor?: ColorTokenKey;
	inputTextColor?: ColorTokenKey;

	inputStyle?: TextInputProps["style"];
};
