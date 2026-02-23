import { Controller, type FieldValues } from "react-hook-form";
import { View } from "react-native";
import { FormFieldHelper } from "./FormFieldHelper";
import { FormFieldInput } from "./FormFieldInput";
import { FormFieldLabel } from "./FormFieldLabel";
import type { FormFieldProps } from "./types";

export function FormField<T extends FieldValues>({
	control,
	name,
	label,
	appearance = "filled",
	rightElement,
	helperText,
	labelColor,
	...inputProps
}: FormFieldProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				//todo: 일단 에러메세지 추출만 함
				const errorMessage = fieldState.error?.message;
				const message = helperText;

				return (
					<View className="mb-[10px]">
						{label && (
							<FormFieldLabel color={labelColor}>{label}</FormFieldLabel>
						)}

						<FormFieldInput
							{...inputProps}
							appearance={appearance}
							value={String(field.value ?? "")}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							hasError={Boolean(errorMessage)}
							rightElement={rightElement}
						/>

						{message && <FormFieldHelper>{message}</FormFieldHelper>}
					</View>
				);
			}}
		/>
	);
}
