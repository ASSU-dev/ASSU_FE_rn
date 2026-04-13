import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData } from "../../model";

interface Props {
	index: number;
}

export function DiscountBenefitFields({ index }: Props) {
	const { control } = useFormContext<ProposalFormData>();
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const borderColor = (field: string) =>
		focusedField === field ? colorTokens.primary : "#e0e0e0";

	return (
		<View className="flex-row items-center gap-[8px]">
			<Text className="w-[77px] text-[13px] text-content-primary">할인율</Text>
			<Controller
				control={control}
				name={`benefits.${index}.discountRate`}
				render={({ field: { value, onChange } }) => (
					<TextInput
						value={value}
						onChangeText={onChange}
						onFocus={() => setFocusedField("discountRate")}
						onBlur={() => setFocusedField(null)}
						placeholder="0"
						placeholderTextColor={colorTokens.contentSecondary}
						keyboardType="numeric"
						textAlign="right"
						className="flex-1 text-[15px] text-content-primary px-[4px]"
						style={{
							borderBottomWidth: 0.5,
							borderBottomColor: borderColor("discountRate"),
							height: 36,
						}}
					/>
				)}
			/>
			<Text className="text-[13px] text-content-secondary w-[88px]">
				% 할인
			</Text>
		</View>
	);
}
