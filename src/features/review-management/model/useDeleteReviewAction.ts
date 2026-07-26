import { useCallback } from "react";
import { Alert } from "react-native";
import { useDeleteReviewMutation } from "../api/useReviewMutations";

export function useDeleteReviewAction() {
	const {
		mutate: deleteReview,
		isPending,
		variables: pendingReviewId,
	} = useDeleteReviewMutation();

	const requestDelete = useCallback(
		(reviewId: string) => {
			if (isPending) return;

			const parsedReviewId = Number(reviewId);
			if (!Number.isSafeInteger(parsedReviewId) || parsedReviewId <= 0) {
				Alert.alert("리뷰 삭제 실패", "유효하지 않은 리뷰입니다.");
				return;
			}

			Alert.alert("리뷰 삭제", "작성한 리뷰를 삭제하시겠어요?", [
				{ text: "취소", style: "cancel" },
				{
					text: "삭제",
					style: "destructive",
					onPress: () => {
						deleteReview(parsedReviewId, {
							onSuccess: () => {
								Alert.alert("리뷰 삭제 완료", "리뷰가 삭제되었습니다.");
							},
							onError: (error) => {
								Alert.alert(
									"리뷰 삭제 실패",
									error instanceof Error
										? error.message
										: "리뷰 삭제에 실패했습니다.",
								);
							},
						});
					},
				},
			]);
		},
		[deleteReview, isPending],
	);

	return {
		requestDelete,
		deletingReviewId:
			isPending && pendingReviewId ? String(pendingReviewId) : null,
	};
}
