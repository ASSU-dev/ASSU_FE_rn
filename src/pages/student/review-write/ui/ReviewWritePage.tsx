import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import {
	useReviewDraftStore,
	useReviewImagePicker,
	useSubmitReviewAction,
} from "@/features/review-management";
import { InfoFillIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";
import { ReviewPhotoPicker } from "./ReviewPhotoPicker";
import { ReviewStoreSummary } from "./ReviewStoreSummary";

export function ReviewWritePage() {
	const context = useReviewDraftStore((state) => state.context);
	const rating = useReviewDraftStore((state) => state.rating);
	const content = useReviewDraftStore((state) => state.content);
	const setContent = useReviewDraftStore((state) => state.setContent);
	const { images, maxImages, selectImages, removeImage } =
		useReviewImagePicker();
	const { canSubmit, isPending, submitReview } = useSubmitReviewAction();

	useFocusEffect(
		useCallback(() => {
			if (!context || rating === 0) {
				router.replace("/(protected)/student/(tabs)/suggestion");
			}
		}, [context, rating]),
	);

	if (!context || rating === 0) return null;

	const handleSubmit = async () => {
		if (!canSubmit || isPending) return;

		try {
			await submitReview();
			router.replace("/(protected)/student/review/complete");
		} catch (error) {
			Alert.alert(
				"리뷰 작성 실패",
				error instanceof Error
					? error.message
					: "리뷰를 작성하지 못했습니다. 다시 시도해 주세요.",
			);
		}
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<AppTopBar title="나의 리뷰 작성" titleAlign="left" />
				<ReviewStoreSummary
					storeName={context.storeName}
					benefitDescription={context.benefitDescription}
				/>
				<View className="h-1 bg-neutral" />

				<ScrollView
					className="flex-1"
					contentContainerClassName="gap-card-gap px-screen-m py-card-gap"
					keyboardShouldPersistTaps="handled"
				>
					<View className="gap-gutter">
						<Text className="px-[4px] font-medium text-lg leading-caption tracking-caption text-content-primary">
							리뷰를 작성해주세요
						</Text>
						<TextInput
							value={content}
							onChangeText={setContent}
							placeholder="리뷰를 작성해주세요"
							placeholderTextColor={colorTokens.contentSecondary}
							multiline
							textAlignVertical="top"
							className="h-[188px] rounded-[8px] border border-neutral-variant p-[14px] font-regular text-sm leading-caption tracking-caption text-content-primary"
						/>
						<View className="flex-row items-center gap-[4px] rounded-[3px] bg-neutral px-[7px] py-[3px]">
							<InfoFillIcon width={10} height={10} />
							<Text className="flex-1 font-regular text-[11px] leading-caption tracking-caption text-content-secondary">
								부적절한 언어 및 비속어 사용 시 사전 통보없이 삭제될 수
								있습니다.
							</Text>
						</View>
					</View>

					<ReviewPhotoPicker
						images={images}
						maxImages={maxImages}
						onAdd={selectImages}
						onRemove={removeImage}
					/>
				</ScrollView>

				<View className="items-center pb-4 pt-2">
					<MediumButton
						disabled={!canSubmit || isPending}
						onPress={handleSubmit}
					>
						{isPending ? "작성 중..." : "작성완료"}
					</MediumButton>
				</View>
			</KeyboardAvoidingView>
		</PageLayout>
	);
}
