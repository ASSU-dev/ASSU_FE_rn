import { useQuery } from "@tanstack/react-query";
import { getInquiryDetail, inquiryQueryKeys } from "@/entities/inquiry";

export function useInquiryDetail(id: string) {
	return useQuery({
		queryKey: inquiryQueryKeys.detail(id),
		queryFn: () => getInquiryDetail(id),
		enabled: !!id,
	});
}
