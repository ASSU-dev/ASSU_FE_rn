import { memo } from "react";
import { Text, View } from "react-native";
import type { Partnership } from "../model/types";

const BADGE_LABEL_CONTENT = "제휴내용";
const BADGE_LABEL_PERIOD = "제휴기간";

interface PartnershipCardProps extends Partnership {}

export const PartnershipCard = memo(({
	storeName,
	benefitContent,
	startDate,
	endDate,
}: PartnershipCardProps) => {
	return (
		<View className="flex-1 rounded-lg bg-canvas px-4 py-5">
			{/* Store name */}
			<Text className="mb-5 text-lg font-semibold text-content-primary">
				{storeName}
			</Text>

			{/* Benefit content row */}
			<View className="mb-1 flex-row gap-2">
				<View className="flex-shrink-0 rounded-full bg-primary-tint px-2.5 py-1">
					<Text className="text-xs font-regular text-primary">
						{BADGE_LABEL_CONTENT}
					</Text>
				</View>
				<View className="flex-1">
					<Text className="flex-1 text-xs font-regular text-content-secondary">
						{benefitContent}
					</Text>
				</View>
			</View>

			{/* Partnership period row */}
			<View className="flex-row items-center gap-2">
				<View className="flex-shrink-0 rounded-full bg-primary-tint px-2.5 py-1">
					<Text className="text-xs font-regular text-primary">
						{BADGE_LABEL_PERIOD}
					</Text>
				</View>
				<View className="flex-row items-center gap-1">
					<Text className="text-xs font-regular text-content-secondary">
						{startDate}
					</Text>
					<Text className="text-xs font-regular text-content-secondary">~</Text>
					<Text className="text-xs font-regular text-content-secondary">
						{endDate}
					</Text>
				</View>
			</View>
		</View>
	);
});
