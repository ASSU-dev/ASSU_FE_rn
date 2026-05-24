import { Text, View } from "react-native";
import type { BenefitItem } from "@/entities/partnership";

interface Props {
	benefit: BenefitItem;
}

function BenefitDetail({ benefit }: { benefit: BenefitItem }) {
	if (benefit.serviceType === "기타 혜택") {
		return (
			<View className="px-[10px] py-[5px]">
				<Text className="text-[15px] text-content-primary">
					{benefit.content}
				</Text>
			</View>
		);
	}

	const criterionText =
		benefit.criteria === "인원수"
			? benefit.minCount
				? `${benefit.minCount}명`
				: "-"
			: benefit.amount
				? `${Number(benefit.amount).toLocaleString()}원`
				: "-";

	const conditionSuffix =
		benefit.criteria === "인원수" ? "인 이상일 경우" : "원 이상일 경우";

	if (benefit.serviceType === "할인 혜택") {
		return (
			<View className="flex-row items-center justify-between px-[10px]">
				<View className="px-[10px] py-[5px] rounded-lg">
					<Text className="text-[13px] font-semibold text-content-primary">
						{criterionText}
					</Text>
				</View>
				<Text className="text-[17px] text-content-primary opacity-70">
					{conditionSuffix}
				</Text>
				<View className="px-[10px] py-[5px] rounded-lg">
					<Text className="text-[13px] font-semibold text-content-primary">
						{benefit.discountRate}%
					</Text>
				</View>
				<Text className="text-[17px] text-content-primary opacity-70">
					할인
				</Text>
			</View>
		);
	}

	// 서비스 제공
	return (
		<View className="flex-row items-center justify-between px-[10px]">
			<View className="px-[10px] py-[5px] rounded-lg">
				<Text className="text-[13px] font-semibold text-content-primary">
					{criterionText}
				</Text>
			</View>
			<Text className="text-[17px] text-content-primary opacity-70">
				{conditionSuffix}
			</Text>
			<View className="px-[10px] py-[5px] rounded-lg min-w-[80px] items-center">
				<Text className="text-[13px] font-semibold text-content-primary text-center">
					{benefit.items.join(", ")}
				</Text>
			</View>
			<Text className="text-[17px] text-content-primary opacity-70">제공</Text>
		</View>
	);
}

export function BenefitSummaryCard({ benefit }: Props) {
	return (
		<View className="bg-neutral rounded-lg px-[15px] py-[8px] opacity-80 gap-[4px]">
			<View className="px-[10px]">
				<Text className="text-[13px] font-semibold text-content-secondary">
					{benefit.serviceType}
				</Text>
			</View>
			<BenefitDetail benefit={benefit} />
		</View>
	);
}
