import {
	Controller,
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import {
	DEFAULT_BENEFIT_ITEM,
	isBenefitItemValid,
	type ProposalFormData,
} from "../model";
import { BenefitCard } from "./BenefitCard";
import { PlaceSearchField } from "./PlaceSearchField";
import { UnderlineField } from "./UnderlineField";

type Props = { onNext: () => void };

export function ProposalInfoStep({ onNext }: Props) {
	const { control, trigger } = useFormContext<ProposalFormData>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "benefits",
	});
	const { bottom } = useSafeAreaInsets();

	const selectedPlace = useWatch({ control, name: "selectedPlace" });
	const benefits = useWatch({ control, name: "benefits" });

	const isNextEnabled =
		selectedPlace !== null &&
		benefits.length > 0 &&
		benefits.every(isBenefitItemValid);

	const getGuideMessage = () => {
		if (!selectedPlace) return "제휴 가게를 선택해주세요";
		if (!benefits.length) return "혜택을 추가해주세요";
		return "혜택 내용을 모두 입력해주세요";
	};

	const handleNext = async () => {
		const valid = await trigger(["selectedPlace", "benefits"]);
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
					name="selectedPlace"
					render={({ field: { value, onChange } }) => (
						<PlaceSearchField
							label="제휴 가게"
							value={value}
							onChange={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					name="storeDetailAddress"
					render={({ field: { value, onChange } }) => (
						<UnderlineField
							label="상세 주소 (선택)"
							value={value}
							onChangeText={onChange}
							placeholder="예) 2층 201호"
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
