import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import {
	ReviewCard,
	ReviewSummary,
	useStoreReviewAverage,
	useStoreReviews,
} from "@/entities/review";
import { type StoreBenefit, useStorePapers } from "@/entities/store";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { InfoBanner } from "@/shared/ui/info/InfoBanner";
import { PageLayout } from "@/shared/ui/layout/PageLayout";

interface StudentStoreReviewPageProps {
	storeId: number | null;
	fallbackStoreName?: string;
}

const PREVIEW_REVIEW_PARAMS = {
	page: 1,
	size: 2,
	sort: "createdAt,desc",
};

export function StudentStoreReviewPage({
	storeId,
	fallbackStoreName,
}: StudentStoreReviewPageProps) {
	const {
		data: storePapers,
		isLoading: isPapersLoading,
		isError: isPapersError,
	} = useStorePapers(storeId);
	const {
		data: reviewPage,
		isLoading: isReviewsLoading,
		isError: isReviewsError,
	} = useStoreReviews(storeId, PREVIEW_REVIEW_PARAMS);
	const {
		data: averageRating,
		isLoading: isAverageLoading,
		isError: isAverageError,
	} = useStoreReviewAverage(storeId);
	const reviews = reviewPage?.reviews ?? [];
	const storeName =
		storePapers?.storeName ||
		reviews[0]?.storeName ||
		fallbackStoreName ||
		"가게 리뷰";

	if (storeId === null) {
		return <InvalidStorePage />;
	}

	return (
		<PageLayout
			scrollable
			withBottomInset
			contentContainerClassName="pb-screen-m"
		>
			<AppTopBar title={storeName} />

			<StoreBenefitsSection
				items={storePapers?.partnershipContents ?? []}
				isLoading={isPapersLoading}
				isError={isPapersError}
			/>

			<View className="h-[4px] bg-neutral" />

			<View className="mt-[30px] items-center">
				{isAverageLoading ? (
					<ActivityIndicator />
				) : isAverageError || averageRating === undefined ? (
					<Text className="text-sm text-danger">
						평균 평점을 불러오지 못했습니다.
					</Text>
				) : (
					<ReviewSummary
						averageRating={averageRating}
						totalCount={reviewPage?.totalElements ?? reviews.length}
					/>
				)}
			</View>

			<View className="mt-[15px] px-screen-m">
				<InfoBanner message="제휴 혜택을 받는 숭실대 학생들의 제휴 평점이에요" />
			</View>

			<View className="mt-[18px] items-end px-screen-m">
				<Pressable
					onPress={() =>
						router.push({
							pathname: "/(protected)/student/store/[storeId]/reviews",
							params: { storeId: String(storeId), storeName },
						})
					}
					hitSlop={8}
				>
					<Text className="text-sm text-content-secondary">전체보기</Text>
				</Pressable>
			</View>

			<View className="mt-[4px] gap-card-gap px-screen-m">
				{isReviewsLoading ? (
					<ActivityIndicator />
				) : isReviewsError ? (
					<Text className="text-center text-sm text-danger">
						리뷰를 불러오지 못했습니다.
					</Text>
				) : reviews.length === 0 ? (
					<Text className="py-[30px] text-center text-sm text-content-secondary">
						아직 작성된 리뷰가 없어요.
					</Text>
				) : (
					reviews.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))
				)}
			</View>
		</PageLayout>
	);
}

interface StoreBenefitsSectionProps {
	items: StoreBenefit[];
	isLoading: boolean;
	isError: boolean;
}

function StoreBenefitsSection({
	items,
	isLoading,
	isError,
}: StoreBenefitsSectionProps) {
	return (
		<View className="px-screen-m pb-[20px] pt-[20px]">
			<Text className="text-md font-medium text-content-primary">
				내가 받을 제휴 혜택
			</Text>
			<View className="mt-[13px] gap-[8px]">
				{isLoading ? (
					<ActivityIndicator size="small" />
				) : isError ? (
					<Text className="text-sm text-content-secondary">
						제휴 혜택을 불러오지 못했어요.
					</Text>
				) : items.length === 0 ? (
					<Text className="text-sm text-content-secondary">
						현재 적용 가능한 제휴 혜택이 없어요.
					</Text>
				) : (
					items.map((item) => (
						<View key={item.id} className="flex-row items-center gap-[6px]">
							<View className="shrink-0 rounded-[999px] bg-primary-tint px-gutter py-[2px]">
								<Text className="font-regular text-[11px] leading-caption text-primary">
									{item.adminName}
								</Text>
							</View>
							<Text className="flex-1 text-sm leading-caption text-content-secondary">
								{item.content}
							</Text>
						</View>
					))
				)}
			</View>
		</View>
	);
}

function InvalidStorePage() {
	return (
		<PageLayout contentContainerClassName="flex-1">
			<AppTopBar title="가게 리뷰" />
			<View className="flex-1 items-center justify-center px-screen-m">
				<Text className="text-center text-sm text-danger">
					올바르지 않은 가게 정보입니다.
				</Text>
			</View>
		</PageLayout>
	);
}
