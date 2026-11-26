import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { BenefitItemFormData, ProposalFormData } from "../model";
import { useFocusBorder } from "../model";

type BenefitFieldName = Exclude<keyof BenefitItemFormData, "id">;

interface Props {
	index: number;
	name: BenefitFieldName;
	label: string;
	placeholder: string;
	maxLength?: number;
	multiline?: boolean;
	numeric?: boolean;
}

export function BenefitInput({
	index,
	name,
	label,
	placeholder,
	maxLength,
	multiline = false,
	numeric = false,
}: Props) {
	const { control, formState } = useFormContext<ProposalFormData>();
	const { borderColor, onFocus, onBlur } = useFocusBorder();
	const error = formState.errors.benefits?.[index]?.[name]?.message;

	return (
		<View className="gap-[8px] py-[5px]">
			<Text className="text-[15px] text-content-primary">{label}</Text>
			<Controller
				control={control}
				name={`benefits.${index}.${name}`}
				render={({ field: { value, onChange } }) => (
					<TextInput
						value={value}
						onChangeText={(text) =>
							onChange(numeric ? text.replace(/\D/g, "") : text)
						}
						onFocus={onFocus(name)}
						onBlur={onBlur}
						placeholder={placeholder}
						placeholderTextColor={colorTokens.contentSecondary}
						maxLength={maxLength}
						multiline={multiline}
						keyboardType={numeric ? "number-pad" : "default"}
						textAlignVertical={multiline ? "top" : "center"}
						className="text-[15px] text-content-primary px-[10px] py-[8px]"
						style={{
							...(multiline && { minHeight: 60, maxHeight: 120 }),
							borderWidth: 1,
							borderColor: borderColor(name),
							borderRadius: 8,
						}}
					/>
				)}
			/>
			{error ? (
				<Text className="text-[12px] text-content-secondary">{error}</Text>
			) : null}
		</View>
	);
}
