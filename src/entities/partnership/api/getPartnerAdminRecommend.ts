import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	BaseResponse,
	PartnerRecommendResponseDTO,
} from "../model/api-types";

async function fetchPartnerAdminRecommend(): Promise<PartnerRecommendResponseDTO> {
	const res = await apiInstance.get<BaseResponse<PartnerRecommendResponseDTO>>(
		"/partner/admin-recommend",
	);
	return res.data.result;
}

export function usePartnerAdminRecommend() {
	return useQuery({
		queryKey: ["partner", "admin-recommend"],
		queryFn: fetchPartnerAdminRecommend,
	});
}
