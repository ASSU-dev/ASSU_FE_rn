import {
	Controller,
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import type { ProposalFormData } from "../model";
import { BenefitCard } from "./BenefitCard";

type Props = { onNext: () => void };

export function ProposalInfoStep({ onNext }: Props) {
	const { control, trigger } = useFormContext<ProposalFormData>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "benefits",
	});
	const { bottom } = useSafeAreaInsets();

	const companyName = useWatch({ control, name: "companyName" });
	const proposerName = useWatch({ control, name: "proposerName" });
	const isNextEnabled = companyName.length > 0 && proposerName.length > 0;

	const handleNext = async () => {
		const valid = await trigger(["companyName", "proposerName"]);
		if (valid) onNext();
	};

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				contentContainerClassName="px-[24px] gap-[25px] pb-4"
				keyboardShouldPersistTaps="handled"
			>
				<Controller
					control={control}
					name="companyName"
					render={({ field: { value, onChange } }) => (
						<UnderlineField
							label="제휴 제안업체"
							value={value}
							onChangeText={onChange}
							placeholder="역전할머니맥주"
						/>
					)}
				/>
				<Controller
					control={control}
					name="proposerName"
					render={({ field: { value, onChange } }) => (
						<UnderlineField
							label="제휴 제안인"
							value={value}
							onChangeText={onChange}
							placeholder="숭실대학교 총학생회"
						/>
					)}
				/>
				<Pressable
					onPress={() =>
						append({
							id: Date.now().toString(),
							serviceType: "서비스 제공",
							criteria: "금액",
							amount: "",
							minCount: "",
							categories: [],
							items: [],
							discountRate: "",
							content: "",
						})
					}
					className="h-[31px] rounded-lg bg-[#e5f6fe] items-center justify-center"
				>
					<Text className="text-[11px] text-[#66a4fe]">혜택 추가하기</Text>
				</Pressable>
				{fields.map((field, index) => (
					<BenefitCard
						key={field.id}
						index={index}
						onRemove={() => remove(index)}
					/>
				))}
			</ScrollView>

			<View
				className="items-center px-[24px]"
				style={{ paddingBottom: Math.max(bottom, 16) }}
			>
				<MediumButton disabled={!isNextEnabled} onPress={handleNext}>
					다음
				</MediumButton>
			</View>
		</View>
	);
}

function UnderlineField({
	label,
	value,
	onChangeText,
	placeholder,
}: {
	label: string;
	value: string;
	onChangeText: (v: string) => void;
	placeholder?: string;
}) {
	return (
		<View className="gap-[5px]">
			<Text className="text-[13px] text-content-secondary px-[15px]">
				{label}
			</Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={colorTokens.contentSecondary}
				className="text-[17px] text-content-primary px-[15px] py-[8px]"
				style={{ borderBottomWidth: 0.5, borderBottomColor: "#e0e0e0" }}
			/>
		</View>
	);
}
