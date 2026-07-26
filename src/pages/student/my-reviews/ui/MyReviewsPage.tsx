import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from "react-native";
import { ReviewCard, useStudentReviews } from "@/entities/review";
import { useDeleteReviewAction } from "@/features/review-management";
import { SortArrowDownIcon } from "@/shared/assets/icons";
import {
	type SortOrder,
	useSortedByDate,
} from "@/shared/lib/hooks/useSortedByDate";
import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { DarkSelectBottomSheet } from "@/shared/ui/bottom-sheet";
import { SmallButton } from "@/shared/ui/buttons/ActionButton";
import { PageLayout } from "@/shared/ui/layout";
import type { Review } from "../model/types";

const SORT_ITEMS: { label: string; value: SortOrder }[] = [
	{ label: "최신순", value: "latest" },
	{ label: "오래된순", value: "oldest" },
];

const listContentStyle = {
	gap: 20,
	paddingHorizontal: 24,
	paddingBottom: 20,
} as const;

export function MyReviewsPage() {
	const [isSortSheetVisible, setSortSheetVisible] = useState(false);
	const { data, isLoading, isError, error } = useStudentReviews();
	const { requestDelete, deletingReviewId } = useDeleteReviewAction();
	const {
		sort,
		setSort,
		sortedItems: sortedReviews,
	} = useSortedByDate(data?.reviews ?? []);
	const count = data?.totalElements ?? sortedReviews.length;

	const renderItem = useCallback(
		({ item }: { item: Review }) => (
			<ReviewCard
				review={item}
				title={item.storeName}
				action={{
					label: deletingReviewId === item.id ? "삭제 중..." : "삭제하기",
					onPress: () => requestDelete(item.id),
				}}
			/>
		),
		[deletingReviewId, requestDelete],
	);

	return (
		<>
			<PageLayout
				className="flex-1 bg-canvas"
				contentContainerClassName="flex-1"
				withBottomInset
			>
				<AppTopBar title="내가 작성한 리뷰" titleAlign="left" />

				{/* 서브헤더 */}
				<View className="flex-row items-center justify-between px-screen-m pt-[20px] pb-[16px]">
					<Text className="text-sm font-medium text-content-primary">
						작성한 리뷰가 <Text className="text-primary">{count}</Text>건 있어요
					</Text>
					<Pressable
						onPress={() => setSortSheetVisible(true)}
						hitSlop={8}
						className="flex-row items-center gap-[5px]"
					>
						<Text className="text-sm font-medium text-content-primary">
							{SORT_ITEMS.find((item) => item.value === sort)?.label}
						</Text>
						<SortArrowDownIcon
							width={20}
							height={20}
							color={colorTokens.contentPrimary}
						/>
					</Pressable>
				</View>

				{/* 리뷰 목록 또는 빈 상태 */}
				{isLoading ? (
					<View className="flex-1 items-center justify-center">
						<ActivityIndicator />
					</View>
				) : isError ? (
					<View className="flex-1 items-center justify-center px-screen-m">
						<Text className="text-center text-sm text-danger">
							{String(error)}
						</Text>
					</View>
				) : sortedReviews.length === 0 ? (
					<View className="absolute inset-0 items-center justify-center gap-7">
						<View className="items-center gap-1.5">
							<Text className="text-base font-medium text-content-primary">
								아직 작성된 리뷰가 없어요!
							</Text>
							<Text className="text-sm text-content-secondary">
								제휴 리뷰를 작성하면 혜택을 받을 수 있어요.
							</Text>
						</View>
						<SmallButton onPress={() => {}}>리뷰 작성하기</SmallButton>
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
