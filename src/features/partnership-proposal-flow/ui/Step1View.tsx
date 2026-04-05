import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { useProposalStore } from "@/features/partnership-proposal-flow";
import { BenefitCard } from "./BenefitCard";

type Props = { onNext: () => void };

export function Step1View({ onNext }: Props) {
	const { step1, benefits, setStep1, addBenefit, removeBenefit, updateBenefit } = useProposalStore();
	const isValid = step1.companyName.trim().length > 0 && step1.proposerName.trim().length > 0;

	return (
		<PageLayout scrollable withBottomInset contentContainerClassName="flex-1">
			<View className="flex-row items-center px-[10px] py-[13px]">
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<Ionicons name="chevron-back" size={24} color={colorTokens.contentPrimary} />
				</Pressable>
				<View className="flex-1 items-center pr-[24px]">
					<Text className="text-xl font-semibold text-content-primary">제휴 제안서</Text>
				</View>
			</View>

			<View className="flex-1 px-[24px] gap-[25px]">
				<UnderlineField
					label="제휴 제안업체"
					value={step1.companyName}
					onChangeText={(v) => setStep1({ companyName: v })}
					placeholder="역전할머니맥주"
				/>
				<UnderlineField
					label="제휴 제안인"
					value={step1.proposerName}
					onChangeText={(v) => setStep1({ proposerName: v })}
					placeholder="숭실대학교 총학생회"
				/>
				<Pressable
					onPress={addBenefit}
					className="h-[31px] rounded-lg bg-[#e5f6fe] items-center justify-center"
				>
					<Text className="text-[11px] text-[#66a4fe]">혜택 추가하기</Text>
				</Pressable>
				{benefits.map((b) => (
					<BenefitCard
						key={b.id}
						benefit={b}
						onRemove={() => removeBenefit(b.id)}
						onUpdate={(data) => updateBenefit(b.id, data)}
					/>
				))}
			</View>

			<View className="items-center pb-4 px-[24px]">
				<MediumButton
					onPress={onNext}
					disabled={!isValid}
					style={{ opacity: isValid ? 1 : 0.3 }}
				>
					다음
				</MediumButton>
			</View>
		</PageLayout>
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
			<Text className="text-[13px] text-content-secondary px-[15px]">{label}</Text>
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
