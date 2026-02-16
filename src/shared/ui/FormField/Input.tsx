import { colorTokens } from "@/shared/styles/token";
import { TextInput, View } from "react-native";
import type {
  FormFieldAppearance,
  FormFieldInputProps,
  FormFieldStatus,
} from "./types";

const APPEARANCE_STYLES: Record<
  FormFieldAppearance,
  { backgroundColor: string; borderColor: string }
> = {
  filled: {
    backgroundColor: colorTokens.neutral, // 회색 배경
    borderColor: colorTokens.neutral,
  },
  outlined: {
    backgroundColor: colorTokens.canvas, // 흰색 배경 (또는 transparent)
    borderColor: colorTokens.contentSecondary, // 회색 테두리
  },
};

/**
 * 상태별 색상 정의
 */
const STATUS_COLORS: Record<
  FormFieldStatus,
  { borderColor?: string; textColor: string }
> = {
  default: {
    borderColor: undefined, // appearance 따름
    textColor: colorTokens.contentPrimary,
  },
  focus: {
    borderColor: colorTokens.primary,
    textColor: colorTokens.contentPrimary,
  },
  error: {
    borderColor: colorTokens.danger,
    textColor: colorTokens.contentPrimary,
  },
};

export function FormFieldInput({
  appearance = "filled",
  status,
  fontSize = 17,

  inputBackgroundColor,
  inputBorderColor,
  inputTextColor,

  inputStyle,
  rightElement,

  multiline,
  ...props
}: FormFieldInputProps) {
  const baseStyle = APPEARANCE_STYLES[appearance];
  const statusStyle = STATUS_COLORS[status];

  const finalBackgroundColor = inputBackgroundColor
    ? colorTokens[inputBackgroundColor]
    : baseStyle.backgroundColor;

  const finalBorderColor = inputBorderColor
    ? colorTokens[inputBorderColor]
    : (statusStyle.borderColor ?? baseStyle.borderColor);

  const finalTextColor = inputTextColor
    ? colorTokens[inputTextColor]
    : statusStyle.textColor;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 8,
          paddingHorizontal: 15,
          minHeight: multiline ? 120 : 50,
          backgroundColor: finalBackgroundColor,
          borderColor: finalBorderColor,
          borderWidth: 1,
        },
      ]}
    >
      <TextInput
        {...props}
        multiline={multiline}
        underlineColorAndroid="transparent"
        style={[
          {
            flex: 1,
            paddingVertical: 15,
            fontSize,
            textAlignVertical: multiline ? "top" : "center",
            color: finalTextColor,
          },
          inputStyle,
        ]}
        placeholderTextColor={colorTokens.contentSecondary}
      />

      {rightElement && <View>{rightElement}</View>}
    </View>
  );
}
//todo: rightElement 로그인/회원가입 구현시 확장 필요
