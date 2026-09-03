import { useQuery } from "@tanstack/react-query";
import { getGetRecommendCarouselPartnershipApi } from "@/shared/api";

const { getRecommendCarouselPartnership } =
	getGetRecommendCarouselPartnershipApi();

export function useGetRecommendCarouselPartnershipQuery() {
	return useQuery({
		queryKey: ["getRecommendCarouselPartnership"],
		queryFn: getRecommendCarouselPartnership,
	});
}
