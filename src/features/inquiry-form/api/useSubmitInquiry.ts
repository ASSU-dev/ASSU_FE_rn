import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInquiry, inquiryQueryKeys } from "@/entities/inquiry";
import type { InquiryFormData } from "../model/types";

export function useSubmitInquiry() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: InquiryFormData) => createInquiry(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: inquiryQueryKeys.all }),
	});
}
