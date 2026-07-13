// 고객리뷰 페이지 — 상단 고정 + 카드만 FlatList 스크롤

import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from "react-native";
import {
	ReviewCard,
	usePartnerReviewAverage,
	usePartnerReviews,
} from "@/entities/review";
import { ReportReviewDialog, useReportReview } from "@/features/report-review";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { DarkSelectBottomSheet } from "@/shared/ui/bottom-sheet";
import { InfoBanner } from "@/shared/ui/info/InfoBanner";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import type { Review } from "../model/types";
import { ReviewListHeader, type SortType } from "./ReviewListHeader";
import { ReviewSummary } from "./ReviewSummary";

const SORT_ITEMS: { label: string; value: SortType }[] = [
	{ label: "최신순", value: "latest" },
	{ label: "오래된순", value: "oldest" },
	{ label: "별점순", value: "rating" },
];

const listContentStyle = {
	gap: 20,
	paddingHorizontal: 24,
	paddingBottom: 20,
} as const;

export function PartnerReviewPage() {
	const [sort, setSort] = useState<SortType>("latest");
	const [isSortSheetVisible, setSortSheetVisible] = useState(false);
	const report = useReportReview();
	const {
		data: reviewPage,
		isLoading: isReviewsLoading,
		isError: isReviewsError,
		error: reviewsError,
	} = usePartnerReviews();
	const { data: averageRating = 0 } = usePartnerReviewAverage();
	const reviews = reviewPage?.reviews ?? [];

	const sortedReviews = useMemo(() => {
		return [...reviews].sort((a, b) => {
			if (sort === "latest")
				return b.createdAt.getTime() - a.createdAt.getTime();
			if (sort === "oldest")
				return a.createdAt.getTime() - b.createdAt.getTime();
			return b.rating - a.rating;
		});
	}, [reviews, sort]);

	const renderItem = useCallback(
		({ item }: { item: Review }) => (
			<ReviewCard
				review={item}
				action={{ label: "신고하기", onPress: () => report.open(item.id) }}
			/>
		),
		[report],
	);

	return (
		<>
			<PageLayout
				className="flex-1 bg-canvas"
				contentContainerClassName="flex-1"
				withBottomInset
			>
				{/* 고정 상단 영역 */}
				<View className="flex-row items-center px-gutter py-[12px]">
					<Pressable onPress={() => router.back()} hitSlop={8}>
						<BackArrowIcon
							width={24}
							height={24}
							color={colorTokens.contentPrimary}
						/>
					</Pressable>
					<View className="flex-1 items-center">
						<Text className="text-[20px] font-semibold text-content-primary leading-caption tracking-caption">
							고객리뷰
						</Text>
					</View>
					<View className="w-[24px]" />
				</View>

				<View className="mt-screen-m items-center">
					<ReviewSummary
						averageRating={averageRating}
						totalCount={reviewPage?.totalElements ?? sortedReviews.length}
					/>
				</View>

				<View className="px-screen-m mt-gutter">
					<InfoBanner message="제휴 혜택을 이용한 사용자들의 리뷰에요" />
				</View>

				<View className="mt-[16px] pb-[16px]">
					<ReviewListHeader
						count={sortedReviews.length}
						sort={sort}
						onPressSort={() => setSortSheetVisible(true)}
					/>
				</View>

				{/* 카드 스크롤 영역 */}
				{isReviewsLoading ? (
					<View className="flex-1 items-center justify-center">
						<ActivityIndicator />
					</View>
				) : isReviewsError ? (
					<View className="flex-1 items-center justify-center px-screen-m">
						<Text className="text-center text-sm text-danger">
							{String(reviewsError)}
						</Text>
					</View>
				) : (
					<FlatList<Review>
						style={{ flex: 1 }}
						data={sortedReviews}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						contentContainerStyle={listContentStyle}
					/>
				)}
			</PageLayout>
			<ReportReviewDialog state={report} />
			<DarkSelectBottomSheet
				visible={isSortSheetVisible}
				title="정렬기준"
				items={SORT_ITEMS}
				value={sort}
				onChange={setSort}
				onClose={() => setSortSheetVisible(false)}
			/>
		</>
	);
}
