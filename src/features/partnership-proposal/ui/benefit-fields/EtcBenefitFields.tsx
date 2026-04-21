import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData } from "../../model";
import { useFocusBorder } from "../../model";

interface Props {
	index: number;
}

export function EtcBenefitFields({ index }: Props) {
	const { control } = useFormContext<ProposalFormData>();
	const { borderColor, onFocus, onBlur } = useFocusBorder();

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
						onFocus={onFocus("content")}
						onBlur={onBlur}
						placeholder="제휴 내용을 입력해주세요"
						placeholderTextColor={colorTokens.contentSecondary}
						multiline
						scrollEnabled
						textAlignVertical="top"
						className="text-[15px] text-content-primary px-[10px] py-[8px]"
						style={{
							minHeight: 80,
							maxHeight: 160,
							borderWidth: 1,
							borderColor: borderColor("content"),
							borderRadius: 8,
						}}
					/>
				)}
			/>
		</View>
	);
}
