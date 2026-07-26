import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useReviewDraftStore } from "@/features/review-management";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout";

export function ReviewCompletePage() {
	const reset = useReviewDraftStore((state) => state.reset);

	useEffect(() => () => reset(), [reset]);

	const close = () => {
		router.replace("/(protected)/student/(tabs)/suggestion");
	};

	const goToMyReviews = () => {
		router.replace("/(protected)/student/my-reviews");
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			<Pressable
				className="absolute left-screen-m top-3 z-10"
				onPress={close}
				hitSlop={8}
			>
				<Ionicons name="close" size={24} color={colorTokens.contentPrimary} />
			</Pressable>

			<View className="flex-1 items-center justify-center -translate-y-[30px] gap-[31px]">
				<View className="items-center gap-card-gap">
					<Text className="font-semibold text-[30px] leading-[39px] tracking-caption text-content-primary">
						리뷰 작성 완료
					</Text>
					<Text className="font-regular text-[20px] leading-caption tracking-caption text-content-secondary">
						소중한 리뷰 감사해요!
					</Text>
				</View>
				<Pressable
					onPress={goToMyReviews}
					className="items-center justify-center rounded-[8px] bg-neutral p-gutter"
				>
					<Text className="font-semibold text-sm leading-caption tracking-caption text-content-secondary">
						작성한 리뷰보기
					</Text>
				</Pressable>
			</View>
		</PageLayout>
	);
}
