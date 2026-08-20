import { memo } from "react";
import { Text, View } from "react-native";
import {
	AffiliationSummaryCard,
	type PartnerAffiliationSummary,
} from "@/entities/partnership";
import { EmptyState } from "@/shared/ui/empty-state";

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
				<Text className="text-md font-semibold leading-[1.3] text-content-primary">
					🔍 제휴단체 추천
				</Text>

				{isLoading ? null : summaries.length === 0 ? (
					<EmptyState
						title="추천할 제휴단체가 없어요"
						description="제휴단체가 추가되면 여기서 확인할 수 있어요!"
					/>
				) : (
					<View className="flex-row gap-[15px]">
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
