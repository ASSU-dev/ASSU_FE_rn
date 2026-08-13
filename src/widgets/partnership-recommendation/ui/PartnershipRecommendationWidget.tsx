import { memo } from "react";
import { Text, View } from "react-native";
import {
	AffiliationSummaryCard,
	type PartnerAffiliationSummary,
} from "@/entities/partnership";

interface PartnershipRecommendationWidgetProps {
	summaries: PartnerAffiliationSummary[];
	isLoading?: boolean;
	onContactPress?: (adminId: number) => void;
}

export const PartnershipRecommendationWidget = memo(
	({
		summaries,
		isLoading = false,
		onContactPress,
	}: PartnershipRecommendationWidgetProps) => {
		return (
			<View className="gap-2">
				<Text className="text-lg font-medium text-content-primary">
					🔍 제휴단체 추천
				</Text>

				{isLoading ? null : summaries.length === 0 ? (
					<View className="items-center gap-2 px-6 py-10">
						<Text className="w-full text-center text-base font-medium text-content-primary">
							제휴중인 단체가 없어요
						</Text>
						<Text className="w-full text-center text-sm font-regular text-content-secondary">
							제휴단체가 추가되면 여기서 확인할 수 있어요!
						</Text>
					</View>
				) : (
					<View className="flex-row gap-3">
						{summaries.map((summary) => (
							<AffiliationSummaryCard
								key={summary.adminId}
								title={summary.title}
								address={summary.address}
								onPress={() => onContactPress?.(summary.adminId)}
							/>
						))}
					</View>
				)}
			</View>
		);
	},
);

PartnershipRecommendationWidget.displayName = "PartnershipRecommendationWidget";
