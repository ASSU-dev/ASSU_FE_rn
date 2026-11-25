import { Text, View } from "react-native";
import type { ContractBenefitItem } from "@/entities/partnership";

interface Props {
	benefit: ContractBenefitItem;
}

/** 제휴 계약서의 혜택 1건 — 조건 · 혜택 · 유의사항 · 그룹 인증 최소 인원 */
export function BenefitSummaryCard({ benefit }: Props) {
	return (
		<View className="bg-neutral rounded-lg px-[15px] py-[8px] opacity-80 gap-[4px]">
			{benefit.benefitCondition ? (
				<View className="px-[10px]">
					<Text className="text-[13px] font-semibold text-content-secondary">
						{benefit.benefitCondition}
					</Text>
				</View>
			) : null}
			<View className="px-[10px] py-[5px]">
				<Text className="text-[15px] text-content-primary">
					{benefit.benefit}
				</Text>
			</View>
			{benefit.caution || benefit.minPeople ? (
				<View className="gap-[2px] px-[10px]">
					{benefit.minPeople ? (
						<Text className="text-[11px] text-content-secondary">
							그룹 인증 최소 {benefit.minPeople}명
						</Text>
					) : null}
					{benefit.caution ? (
						<Text className="text-[11px] text-content-secondary">
							{benefit.caution}
						</Text>
					) : null}
				</View>
			) : null}
		</View>
	);
}
