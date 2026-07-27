import { Text, View } from "react-native";
import { StarIcon } from "@/shared/assets/icons/star-icon";

interface ReviewSummaryProps {
	averageRating: number;
	totalCount: number;
}

export function ReviewSummary({
	averageRating,
	totalCount,
}: ReviewSummaryProps) {
	const roundedRating = Math.round(averageRating);

	return (
		<View className="items-center gap-[16px]">
			<View className="flex-row items-center gap-[12px]">
				<View className="flex-row gap-[6px]">
					{[1, 2, 3, 4, 5].map((star) => (
						<StarIcon key={star} filled={star <= roundedRating} size={25} />
					))}
				</View>
				<Text className="font-semibold text-[20px] text-content-primary">
					{averageRating.toFixed(1)}
				</Text>
			</View>
			<Text className="text-sm text-content-secondary">
				{totalCount}개의 평가
			</Text>
		</View>
	);
}
