import { memo } from "react";
import { Text, View } from "react-native";
import {
	AffiliationSummaryCard,
	type PartnerAffiliationSummary,
} from "@/entities/partnership";

interface PartnershipRecommendationWidgetProps {
	summaries: PartnerAffiliationSummary[];
	onContactPress?: (adminId: number) => void;
}

export const PartnershipRecommendationWidget = memo(
	({ summaries, onContactPress }: PartnershipRecommendationWidgetProps) => {
		return (
			<View className="gap-2">
				{/* Header */}
				<Text className="text-lg font-medium text-content-primary">
					🔍 제휴단체 추천
				</Text>

				{/* Cards grid */}
				<View className="flex-row gap-3">
					{summaries.map((summary) => (
						<AffiliationSummaryCard
							key={summary.title}
							title={summary.title}
							address={summary.address}
							onPress={() => onContactPress?.(summary.adminId)}
						/>
					))}
				</View>
			</View>
		);
	},
);

PartnershipRecommendationWidget.displayName = "PartnershipRecommendationWidget";
