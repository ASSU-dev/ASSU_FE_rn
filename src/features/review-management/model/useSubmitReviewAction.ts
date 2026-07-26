import { useCreateReviewMutation } from "../api/useReviewMutations";
import { useReviewDraftStore } from "./useReviewDraftStore";

export function useSubmitReviewAction() {
	const context = useReviewDraftStore((state) => state.context);
	const rating = useReviewDraftStore((state) => state.rating);
	const content = useReviewDraftStore((state) => state.content);
	const images = useReviewDraftStore((state) => state.images);
	const createReview = useCreateReviewMutation();
	const canSubmit = Boolean(context) && rating > 0 && content.trim().length > 0;

	const submitReview = async () => {
		if (!context || !canSubmit) {
			throw new Error("리뷰 작성 정보를 확인해 주세요.");
		}

		if (context.isMock) return;

		await createReview.mutateAsync({
			request: {
				content: content.trim(),
				rate: rating,
				storeId: context.storeId,
				partnerId: context.partnerId,
				partnershipUsageId: context.partnershipUsageId,
				adminName: context.adminName,
			},
			reviewImages: images,
		});
	};

	return {
		canSubmit,
		isPending: createReview.isPending,
		submitReview,
	};
}
