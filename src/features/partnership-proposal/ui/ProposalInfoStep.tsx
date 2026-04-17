import {
	Controller,
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { DEFAULT_BENEFIT_ITEM, type ProposalFormData } from "../model";
import { BenefitCard } from "./BenefitCard";
import { UnderlineField } from "./UnderlineField";

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
	const benefits = useWatch({ control, name: "benefits" });

	const isBenefitFilled = (b: (typeof benefits)[number]) => {
		if (b.serviceType === "서비스 제공") return b.items.length > 0;
		if (b.serviceType === "할인 혜택") return b.discountRate.trim() !== "";
		if (b.serviceType === "기타 혜택") return b.content.trim() !== "";
		return false;
	};

	const isNextEnabled =
		companyName.length > 0 &&
		proposerName.length > 0 &&
		benefits.length > 0 &&
		benefits.every(isBenefitFilled);

	const getGuideMessage = () => {
		if (!companyName.length) return "제휴 제안업체를 입력해주세요";
		if (!proposerName.length) return "제휴 제안인을 입력해주세요";
		if (!benefits.length) return "혜택을 추가해주세요";
		return "혜택 내용을 모두 입력해주세요";
	};

	const handleNext = async () => {
		const valid = await trigger(["companyName", "proposerName"]);
		if (valid) onNext();
	};

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				contentContainerClassName="px-[24px] pt-[24px] gap-[25px] pb-4"
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
				{fields.map((field, index) => (
					<BenefitCard
						key={field.id}
						index={index}
						onRemove={() => remove(index)}
					/>
				))}
				<Pressable
					onPress={() =>
						append({ ...DEFAULT_BENEFIT_ITEM, id: Date.now().toString() })
					}
					className="h-[31px] rounded-lg bg-primary-tint items-center justify-center"
				>
					<Text className="text-[11px] text-sub">혜택 추가하기</Text>
				</Pressable>
			</ScrollView>

			<View
				className="items-center px-[24px]"
				style={{ paddingBottom: Math.max(bottom, 16) }}
			>
				<MediumButton disabled={!isNextEnabled} onPress={handleNext}>
					{isNextEnabled ? "다음" : getGuideMessage()}
				</MediumButton>
			</View>
		</View>
	);
}
