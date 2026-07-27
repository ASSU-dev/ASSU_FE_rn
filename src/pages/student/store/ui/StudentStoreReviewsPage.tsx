import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import {
	ReviewCard,
	ReviewListHeader,
	type ReviewSortType,
	useInfiniteStoreReviews,
} from "@/entities/review";
import { useStorePapers } from "@/entities/store";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { DarkSelectBottomSheet } from "@/shared/ui/bottom-sheet";
import { InfoBanner } from "@/shared/ui/info/InfoBanner";
import { PageLayout } from "@/shared/ui/layout/PageLayout";

interface StudentStoreReviewsPageProps {
	storeId: number | null;
	fallbackStoreName?: string;
}

const SORT_ITEMS: { label: string; value: ReviewSortType }[] = [
	{ label: "최신순", value: "latest" },
	{ label: "오래된순", value: "oldest" },
	{ label: "별점순", value: "rating" },
];

const SORT_PARAMS: Record<ReviewSortType, string> = {
	latest: "createdAt,desc",
	oldest: "createdAt,asc",
	rating: "rate,desc",
};

const listContentStyle = {
	gap: 20,
	paddingHorizontal: 24,
	paddingBottom: 20,
} as const;

export function StudentStoreReviewsPage({
	storeId,
	fallbackStoreName,
}: StudentStoreReviewsPageProps) {
	const [sort, setSort] = useState<ReviewSortType>("latest");
	const [isSortSheetVisible, setSortSheetVisible] = useState(false);
	const { data: storePapers } = useStorePapers(storeId);
	const reviewParams = useMemo(
		() => ({ size: 20, sort: SORT_PARAMS[sort] }),
		[sort],
	);
	const {
		data,
		isLoading,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteStoreReviews(storeId, reviewParams);
	const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];
	const totalElements = data?.pages[0]?.totalElements ?? reviews.length;
	const storeName =
		storePapers?.storeName ||
		reviews[0]?.storeName ||
		fallbackStoreName ||
		"가게 리뷰";
	const errorMessage =
		error instanceof Error ? error.message : "리뷰를 불러오지 못했습니다.";

	return (
		<>
			<PageLayout
				className="flex-1 bg-canvas"
				contentContainerClassName="flex-1"
				withBottomInset
			>
				<AppTopBar title={storeName} />

				<View className="mt-[14px] px-screen-m">
					<InfoBanner message="제휴 혜택을 받는 숭실대 학생들의 제휴 평점이에요" />
				</View>

				<View className="pb-[20px] pt-[20px]">
					<ReviewListHeader
						count={totalElements}
						sort={sort}
						onPressSort={() => setSortSheetVisible(true)}
					/>
				</View>

				{storeId === null ? (
					<View className="flex-1 items-center justify-center px-screen-m">
						<Text className="text-center text-sm text-danger">
							올바르지 않은 가게 정보입니다.
						</Text>
					</View>
				) : isLoading ? (
					<View className="flex-1 items-center justify-center">
						<ActivityIndicator />
					</View>
				) : isError ? (
					<View className="flex-1 items-center justify-center px-screen-m">
						<Text className="text-center text-sm text-danger">
							{errorMessage}
						</Text>
					</View>
				) : reviews.length === 0 ? (
					<View className="flex-1 items-center justify-center px-screen-m">
						<Text className="text-sm text-content-secondary">
							아직 작성된 리뷰가 없어요.
						</Text>
					</View>
				) : (
					<FlatList
						style={{ flex: 1 }}
						data={reviews}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <ReviewCard review={item} />}
						contentContainerStyle={listContentStyle}
						onEndReached={() => {
							if (hasNextPage && !isFetchingNextPage) {
								void fetchNextPage();
							}
						}}
						onEndReachedThreshold={0.4}
						ListFooterComponent={
							isFetchingNextPage ? (
								<ActivityIndicator className="py-[12px]" />
							) : null
						}
					/>
				)}
			</PageLayout>

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
