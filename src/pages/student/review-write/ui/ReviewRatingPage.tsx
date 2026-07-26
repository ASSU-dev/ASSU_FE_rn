import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { useReviewDraftStore } from "@/features/review-management";
import { BackArrowIcon } from "@/shared/assets/icons";
import { StarIcon } from "@/shared/assets/icons/star-icon";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function ReviewRatingPage() {
	const context = useReviewDraftStore((state) => state.context);
	const rating = useReviewDraftStore((state) => state.rating);
	const setRating = useReviewDraftStore((state) => state.setRating);
	const reset = useReviewDraftStore((state) => state.reset);

	useFocusEffect(
		useCallback(() => {
			if (!context) {
				router.replace("/(protected)/student/(tabs)/suggestion");
			}
		}, [context]),
	);

	if (!context) return null;

	const handleBack = () => {
		reset();
		router.back();
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			<View className="px-screen-m py-4 mt-3">
				<Pressable onPress={handleBack} hitSlop={8} className="size-6">
					<BackArrowIcon
						width={24}
						height={24}
						color={colorTokens.contentPrimary}
					/>
				</Pressable>
			</View>

			<View className="flex-1 items-center justify-center -translate-y-[30px] gap-[25px]">
				<View className="items-center gap-[8px]">
					<View className="items-center px-[5px]">
						<Text className="font-semibold text-[20px] leading-[26px] text-content-primary">
							{context.storeName}
						</Text>
						<Text className="font-semibold text-[20px] leading-[26px] text-content-primary">
							어떠셨나요?
						</Text>
					</View>
					<Text className="font-regular text-sm leading-caption tracking-caption text-content-secondary">
						{context.adminName} 제휴
					</Text>
				</View>

				<View className="flex-row gap-[4px]">
					{[1, 2, 3, 4, 5].map((star) => (
						<Pressable
							key={star}
							onPress={() => setRating(star)}
							accessibilityLabel={`${star}점`}
						>
							<StarIcon filled={star <= rating} size={33} />
						</Pressable>
					))}
				</View>
			</View>

			<View className="items-center pb-4">
				<MediumButton
					disabled={rating === 0}
					onPress={() => router.push("/(protected)/student/review/write")}
				>
					리뷰 작성하기
				</MediumButton>
			</View>
		</PageLayout>
	);
}
