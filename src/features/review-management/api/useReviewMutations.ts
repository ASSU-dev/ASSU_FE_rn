import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewQueryKeys } from "@/entities/review";
import { createReview, deleteReview } from "./reviewManagement";

const MY_PARTNERSHIPS_QUERY_KEY = ["partnerships", "my"] as const;

export function useCreateReviewMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReview,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: reviewQueryKeys.all }),
				queryClient.invalidateQueries({
					queryKey: MY_PARTNERSHIPS_QUERY_KEY,
				}),
			]);
		},
	});
}

export function useDeleteReviewMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteReview,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: reviewQueryKeys.all }),
				queryClient.invalidateQueries({
					queryKey: MY_PARTNERSHIPS_QUERY_KEY,
				}),
			]);
		},
	});
}
