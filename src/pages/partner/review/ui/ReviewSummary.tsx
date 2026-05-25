// 별점 요약 섹션 — 별 5개(표시용) + 평균 점수 + n개의 평가

import { Text, View } from "react-native";
import { StarIcon } from "@/shared/assets/icons/star-icon";

interface Props {
	averageRating: number;
	totalCount: number;
}

export function ReviewSummary({ averageRating, totalCount }: Props) {
	const rounded = Math.round(averageRating);

	return (
		<View className="items-center gap-[16px]">
			<View className="flex-row items-center gap-[12px]">
				<View className="flex-row gap-[6px]">
					{[1, 2, 3, 4, 5].map((star) => (
						<StarIcon key={star} filled={star <= rounded} size={25} />
					))}
				</View>
				<Text className="text-[20px] font-semibold text-content-primary">
					{averageRating.toFixed(1)}
				</Text>
			</View>
			<Text className="text-sm text-content-secondary">
				{totalCount}개의 평가
			</Text>
		</View>
	);
}
