import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData } from "../../model";

interface Props {
	index: number;
}

export function EtcBenefitFields({ index }: Props) {
	const { control } = useFormContext<ProposalFormData>();
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const borderColor = (field: string) =>
		focusedField === field ? colorTokens.primary : "#e0e0e0";

	return (
		<View className="gap-[8px] py-[5px]">
			<Text className="text-[15px] text-content-primary">제휴 내용 입력</Text>
			<Controller
				control={control}
				name={`benefits.${index}.content`}
				render={({ field: { value, onChange } }) => (
					<TextInput
						value={value}
						onChangeText={onChange}
						onFocus={() => setFocusedField("content")}
						onBlur={() => setFocusedField(null)}
						placeholder="제휴 내용을 입력해주세요"
						placeholderTextColor={colorTokens.contentSecondary}
						className="text-[15px] text-content-primary px-[4px]"
						style={{
							borderBottomWidth: 1,
							borderBottomColor: borderColor("content"),
							height: 36,
						}}
					/>
				)}
			/>
		</View>
	);
}
