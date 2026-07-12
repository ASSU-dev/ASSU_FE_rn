import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	AdminRecommendResponseDTO,
	BaseResponse,
} from "../model/api-types";

async function fetchAdminPartnerRecommend(): Promise<AdminRecommendResponseDTO> {
	const res = await apiInstance.get<BaseResponse<AdminRecommendResponseDTO>>(
		"/admin/partner-recommend",
	);
	return res.data.result;
}

export function useAdminPartnerRecommend() {
	return useQuery({
		queryKey: ["admin", "partner-recommend"],
		queryFn: fetchAdminPartnerRecommend,
	});
}
