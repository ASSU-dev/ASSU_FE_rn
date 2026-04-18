import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData, ServiceType } from "../model";
import { DEFAULT_BENEFIT_ITEM, SERVICE_TYPES } from "../model";
import { CriteriaFields } from "./benefit-fields/CriteriaFields";
import { DiscountBenefitFields } from "./benefit-fields/DiscountBenefitFields";
import { EtcBenefitFields } from "./benefit-fields/EtcBenefitFields";
import { ServiceBenefitFields } from "./benefit-fields/ServiceBenefitFields";

const BENEFIT_CONFIG: Record<
	ServiceType,
	{ showCriteria: boolean; Fields: React.ComponentType<{ index: number }> }
> = {
	"서비스 제공": { showCriteria: true, Fields: ServiceBenefitFields },
	"할인 혜택": { showCriteria: true, Fields: DiscountBenefitFields },
	"기타 혜택": { showCriteria: false, Fields: EtcBenefitFields },
};

interface Props {
	index: number;
	onRemove: () => void;
}

export function BenefitCard({ index, onRemove }: Props) {
	const { control, setValue, getValues } = useFormContext<ProposalFormData>();
	const [showServiceTypeMenu, setShowServiceTypeMenu] = useState(false);

	const serviceType = useWatch({
		control,
		name: `benefits.${index}.serviceType`,
	});

	const { showCriteria, Fields } = BENEFIT_CONFIG[serviceType];

	const selectServiceType = (type: ServiceType) => {
		const currentId = getValues(`benefits.${index}.id`);
		setValue(`benefits.${index}`, {
			...DEFAULT_BENEFIT_ITEM,
			id: currentId,
			serviceType: type,
		});
		setShowServiceTypeMenu(false);
	};

	return (
		<View className="bg-neutral rounded-lg px-[20px]">
			{/* 헤더: 혜택 타입 선택 + 삭제 */}
			<View className="py-[15px] flex-row items-center justify-between">
				<View>
					<Pressable
						onPress={() => setShowServiceTypeMenu((v) => !v)}
						className="border border-primary rounded-lg px-[10px] py-[10px] flex-row items-center gap-[2px]"
					>
						<Text className="text-primary text-[13px]">{serviceType}</Text>
						<Ionicons
							name="chevron-down"
							size={14}
							color={colorTokens.primary}
						/>
					</Pressable>
					{showServiceTypeMenu && (
						<View className="absolute top-[42px] left-0 z-10 bg-white rounded-lg shadow-md border border-[#e0e0e0] overflow-hidden">
							{SERVICE_TYPES.map((type) => (
								<Pressable
									key={type}
									onPress={() => selectServiceType(type)}
									className="px-[14px] py-[10px]"
								>
									<Text
										className={`text-[13px] ${serviceType === type ? "text-primary font-medium" : "text-content-primary"}`}
									>
										{type}
									</Text>
								</Pressable>
							))}
						</View>
					)}
				</View>
				<Pressable onPress={onRemove}>
					<Text className="text-content-secondary text-[13px]">삭제하기</Text>
				</Pressable>
			</View>

			{/* 혜택 타입별 필드 */}
			<View className="pt-[24px] pb-[20px] gap-[15px] px-[10px]">
				{showCriteria && <CriteriaFields index={index} />}
				<Fields index={index} />
			</View>
		</View>
	);
}
