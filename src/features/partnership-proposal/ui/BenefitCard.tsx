import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { ProposalFormData, ServiceType } from "../model";
import { SERVICE_TYPES } from "../model";
import { CriteriaFields } from "./benefit-fields/CriteriaFields";
import { DiscountBenefitFields } from "./benefit-fields/DiscountBenefitFields";
import { EtcBenefitFields } from "./benefit-fields/EtcBenefitFields";
import { ServiceBenefitFields } from "./benefit-fields/ServiceBenefitFields";

interface Props {
	index: number;
	onRemove: () => void;
}

export function BenefitCard({ index, onRemove }: Props) {
	const { control, setValue } = useFormContext<ProposalFormData>();
	const [showServiceTypeMenu, setShowServiceTypeMenu] = useState(false);

	const serviceType = useWatch({
		control,
		name: `benefits.${index}.serviceType`,
	});

	const selectServiceType = (type: ServiceType) => {
		setValue(`benefits.${index}.serviceType`, type);
		setValue(`benefits.${index}.criteria`, "금액");
		setValue(`benefits.${index}.amount`, "");
		setValue(`benefits.${index}.minCount`, "");
		setValue(`benefits.${index}.categories`, []);
		setValue(`benefits.${index}.items`, []);
		setValue(`benefits.${index}.discountRate`, "");
		setValue(`benefits.${index}.content`, "");
		setShowServiceTypeMenu(false);
	};

	return (
		<View className="bg-[#f4f4f5] rounded-lg p-[10px] gap-[15px]">
			{/* 헤더: 혜택 타입 선택 + 삭제 */}
			<View className="flex-row items-center justify-between">
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

			<View style={{ height: 0.5, backgroundColor: "#e0e0e0" }} />

			{/* 혜택 타입별 필드 */}
			{serviceType === "기타 혜택" ? (
				<EtcBenefitFields index={index} />
			) : (
				<>
					<CriteriaFields index={index} />
					{serviceType === "할인 혜택" ? (
						<DiscountBenefitFields index={index} />
					) : (
						<ServiceBenefitFields index={index} />
					)}
				</>
			)}
		</View>
	);
}
