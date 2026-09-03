import { Pressable, Text, View } from "react-native";
import { SortArrowDown } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

export type ReviewSortType = "latest" | "oldest" | "rating";

const SORT_LABELS: Record<ReviewSortType, string> = {
	latest: "최신순",
	oldest: "오래된순",
	rating: "별점순",
};

interface ReviewListHeaderProps {
	count: number;
	sort: ReviewSortType;
	onPressSort: () => void;
	countLabel?: string;
}

export function ReviewListHeader({
	count,
	sort,
	onPressSort,
	countLabel = "작성한 리뷰가",
}: ReviewListHeaderProps) {
	return (
		<View className="flex-row items-center justify-between px-screen-m">
			<Text className="text-sm font-medium text-content-primary">
				{countLabel} <Text className="text-primary">{count}</Text>건 있어요
			</Text>
			<Pressable
				onPress={onPressSort}
				hitSlop={8}
				className="flex-row items-center gap-[5px]"
			>
				<Text className="text-sm font-medium text-content-primary">
					{SORT_LABELS[sort]}
				</Text>
				<SortArrowDown
					width={20}
					height={20}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
		</View>
	);
}
