import { useQuery } from "@tanstack/react-query";
import { getInquiries, inquiryQueryKeys } from "@/entities/inquiry";

export function useInquiryList() {
	return useQuery({
		queryKey: inquiryQueryKeys.list(),
		queryFn: () => getInquiries(),
	});
}
