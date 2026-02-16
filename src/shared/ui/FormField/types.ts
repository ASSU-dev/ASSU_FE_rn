import type { colorTokens } from "@/shared/styles/token";
import type { ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { TextInputProps } from "react-native";

export type ColorTokenKey = keyof typeof colorTokens;

/**
 * 현재 크게 텍스트필드가 2가지 형태로 나뉨.
 * filled: 배경색 있음, 테두리 없음 (기본)
 * outlined: 배경색 흰색, 테두리 있음
 */
export type FormFieldAppearance = "filled" | "outlined";

/**
 * 로직 내부에서 계산되어 스타일을 덮어씀
 */
export type FormFieldStatus = "default" | "focus" | "error";

export type FormFieldProps<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  helperText?: string;

  appearance?: FormFieldAppearance;

  labelColor?: ColorTokenKey;
  helperTextColor?: ColorTokenKey;

  rightElement?: ReactNode;

  // 커스텀 오버라이드 (필요한 경우에만 사용)
  inputBackgroundColor?: ColorTokenKey;
  inputBorderColor?: ColorTokenKey;
  inputTextColor?: ColorTokenKey;
  placeholderColor?: ColorTokenKey;
};

// Input 컴포넌트 전용 Props
export type FormFieldInputProps = TextInputProps & {
  appearance: FormFieldAppearance;
  status: FormFieldStatus;

  fontSize?: number;
  rightElement?: ReactNode;

  inputBackgroundColor?: ColorTokenKey;
  inputBorderColor?: ColorTokenKey;
  inputTextColor?: ColorTokenKey;
  placeholderColor?: ColorTokenKey;
  inputStyle?: TextInputProps["style"];
};
