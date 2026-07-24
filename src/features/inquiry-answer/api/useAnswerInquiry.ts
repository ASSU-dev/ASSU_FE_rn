import { useMutation, useQueryClient } from "@tanstack/react-query";
import { answerInquiry, inquiryQueryKeys } from "@/entities/inquiry";

export function useAnswerInquiry(inquiryId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (answer: string) => answerInquiry(inquiryId, { answer }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: inquiryQueryKeys.all }),
	});
}
