import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { CheckGrayIcon, CheckIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import type { BenefitCriteria, ProposalFormData } from "../../model";
import { useFocusBorder } from "../../model";

interface Props {
	index: number;
}

export function CriteriaFields({ index }: Props) {
	const { control, setValue } = useFormContext<ProposalFormData>();
	const { onFocus, onBlur } = useFocusBorder();
	const criteria = useWatch({ control, name: `benefits.${index}.criteria` });

	const selectCriteria = (value: BenefitCriteria) => {
		setValue(`benefits.${index}.criteria`, value);
		setValue(`benefits.${index}.amount`, "");
		setValue(`benefits.${index}.minCount`, "");
	};

	return (
		<>
			<View className="flex-row items-center">
				<Text className="w-[77px] text-[13px] text-content-primary">
					제공 기준
				</Text>
				<View className="flex-row gap-[12px]">
					{(["금액", "인원수"] as BenefitCriteria[]).map((option) => {
						const selected = criteria === option;
						return (
							<Pressable
								key={option}
								onPress={() => selectCriteria(option)}
								className="flex-row items-center gap-[5px]"
							>
								{selected ? (
									<CheckIcon width={15} height={15} />
								) : (
									<CheckGrayIcon width={15} height={15} />
								)}
								<Text className="text-[13px] text-content-primary">
									{option}
								</Text>
							</Pressable>
						);
					})}
				</View>
			</View>

			{criteria === "금액" && (
				<View className="flex-row items-center gap-[8px]">
					<View className="w-[77px]" />
					<Controller
						control={control}
						name={`benefits.${index}.amount`}
						render={({ field: { value, onChange } }) => (
							<TextInput
								value={value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
								onChangeText={(v) => onChange(v.replace(/,/g, ""))}
								onFocus={onFocus("amount")}
								onBlur={onBlur}
								onSubmitEditing={() => Keyboard.dismiss()}
								placeholder="금액 입력"
								placeholderTextColor={colorTokens.contentSecondary}
								keyboardType="numeric"
								returnKeyType="done"
								returnKeyLabel="완료"
								textAlign="right"
								className="flex-1 text-[15px] text-content-primary px-[4px]"
								style={{ height: 36 }}
							/>
						)}
					/>
					<Text className="text-[13px] text-content-secondary w-[88px]">
						원 이상일 경우,
					</Text>
				</View>
			)}

			{criteria === "인원수" && (
				<View className="flex-row items-center gap-[8px]">
					<View className="w-[77px]" />
					<Controller
						control={control}
						name={`benefits.${index}.minCount`}
						render={({ field: { value, onChange } }) => (
							<TextInput
								value={value}
								onChangeText={onChange}
								onFocus={onFocus("minCount")}
								onBlur={onBlur}
								onSubmitEditing={() => Keyboard.dismiss()}
								placeholder="인원 입력"
								placeholderTextColor={colorTokens.contentSecondary}
								keyboardType="number-pad"
								returnKeyType="done"
								returnKeyLabel="완료"
								textAlign="right"
								className="flex-1 text-[15px] text-content-primary px-[4px]"
								style={{ height: 36 }}
							/>
						)}
					/>
					<Text className="text-[13px] text-content-secondary w-[88px]">
						인 이상일 경우,
					</Text>
				</View>
			)}
		</>
	);
}
