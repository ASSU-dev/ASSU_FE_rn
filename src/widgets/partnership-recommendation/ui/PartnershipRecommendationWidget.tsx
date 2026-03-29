import { memo } from "react";
import { Text, View } from "react-native";
import {
	AffiliationSummaryCard,
	type MOCK_PARTNER_AFFILIATION_SUMMARIES,
} from "@/entities/partnership";

type AffiliationSummary = (typeof MOCK_PARTNER_AFFILIATION_SUMMARIES)[number];

interface PartnershipRecommendationWidgetProps {
	summaries: AffiliationSummary[];
	onContactPress?: (title: string) => void;
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
							onPress={() => onContactPress?.(summary.title)}
						/>
					))}
				</View>
			</View>
		);
	},
);

PartnershipRecommendationWidget.displayName = "PartnershipRecommendationWidget";
