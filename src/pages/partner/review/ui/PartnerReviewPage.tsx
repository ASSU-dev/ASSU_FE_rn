// 고객리뷰 페이지 — 상단 고정 + 카드만 FlatList 스크롤

import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { InfoBanner } from "@/shared/ui/info/InfoBanner";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { mockReviews } from "../model/mockReviews";
import type { Review } from "../model/types";
import { ReviewCard } from "./ReviewCard";
import { ReviewListHeader, type SortType } from "./ReviewListHeader";
import { ReviewSummary } from "./ReviewSummary";

const listContentStyle = {
	gap: 20,
	paddingHorizontal: 24,
	paddingBottom: 20,
} as const;

export function PartnerReviewPage() {
	const [sort, setSort] = useState<SortType>("latest");

	const sortedReviews = useMemo(() => {
		return [...mockReviews].sort((a, b) =>
			sort === "latest"
				? b.createdAt.getTime() - a.createdAt.getTime()
				: b.rating - a.rating,
		);
	}, [sort]);

	const toggleSort = () =>
		setSort((prev) => (prev === "latest" ? "rating" : "latest"));

	return (
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
					averageRating={
						mockReviews.reduce((sum, r) => sum + r.rating, 0) /
						mockReviews.length
					}
					totalCount={mockReviews.length}
				/>
			</View>

			<View className="px-screen-m mt-gutter">
				<InfoBanner message="제휴 혜택을 이용한 사용자들의 리뷰에요" />
			</View>

			<View className="mt-[16px] pb-[16px]">
				<ReviewListHeader
					count={sortedReviews.length}
					sort={sort}
					onToggleSort={toggleSort}
				/>
			</View>

			{/* 카드 스크롤 영역 */}
			<FlatList<Review>
				style={{ flex: 1 }}
				data={sortedReviews}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ReviewCard review={item} onReport={() => {}} />
				)}
				contentContainerStyle={listContentStyle}
			/>
		</PageLayout>
	);
}
