import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { FormFieldInput } from "@/shared/ui/FormField/FormFieldInput";
import type { ColorTokenKey } from "@/shared/ui/FormField/types";

type LabeledInputFieldProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChangeText?: (text: string) => void;
	rightElement?: ReactNode;
	editable?: boolean;
	inputTextColor?: ColorTokenKey;
	inputBorderColor?: ColorTokenKey;
	secureTextEntry?: boolean;
};

export function LabeledInputField({
	label,
	placeholder,
	value,
	onChangeText,
	rightElement,
	editable = true,
	inputTextColor,
	inputBorderColor,
	secureTextEntry,
}: LabeledInputFieldProps) {
	return (
		<View className={label ? "w-full gap-[8px]" : "w-full"}>
			{label ? (
				<Text className="text-[13px] text-content-secondary">{label}</Text>
			) : null}
			<FormFieldInput
				appearance="filled"
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				rightElement={rightElement}
				editable={editable}
				inputTextColor={inputTextColor}
				inputBorderColor={inputBorderColor}
				secureTextEntry={secureTextEntry}
			/>
		</View>
	);
}
