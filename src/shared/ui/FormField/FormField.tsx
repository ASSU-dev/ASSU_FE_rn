import { colorTokens } from "@/shared/styles/token";
import { useState } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { FormFieldInput } from "./Input";
import type { FormFieldProps, FormFieldStatus } from "./types";

/**
 * 현재 상태를 계산하는 헬퍼 함수
 */
function getStatus(hasError: boolean, isFocused: boolean): FormFieldStatus {
  if (hasError) return "error"; // 에러 발생 시 status만 'error'로 전달
  if (isFocused) return "focus";
  return "default";
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  appearance = "filled",
  rightElement,
  helperText,
  labelColor,
  helperTextColor,
  ...inputProps
}: FormFieldProps<T>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = Boolean(fieldState.error);
        const status = getStatus(hasError, isFocused);

        return (
          <View style={{ marginBottom: 10 }}>
            {label && (
              <Text
                style={{
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: "600",
                  color: labelColor ?? colorTokens.contentSecondary,
                }}
              >
                {label}
              </Text>
            )}

            <FormFieldInput
              {...inputProps}
              appearance={appearance}
              status={status}
              value={field.value ?? ""}
              onChangeText={field.onChange}
              onFocus={(e) => {
                setIsFocused(true);
                inputProps.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                field.onBlur();
                inputProps.onBlur?.(e);
              }}
              rightElement={rightElement}
            />

            {helperText && (
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: helperTextColor ?? colorTokens.contentSecondary,
                  textAlign: "right",
                }}
              >
                {helperText}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}
//todo: helperText 로그인/회원가입 구현시 확장 필요
