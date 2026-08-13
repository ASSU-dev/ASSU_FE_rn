import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiInstance } from "@/shared/api/instance";
import type {
	AdminRecommendResponseDTO,
	BaseResponse,
} from "../model/api-types";

const NO_RECOMMENDED_PARTNER_CODE = "MEMBER_4009";

async function fetchAdminPartnerRecommend(): Promise<AdminRecommendResponseDTO | null> {
	try {
		const res = await apiInstance.get<BaseResponse<AdminRecommendResponseDTO>>(
			"/admin/partner-recommend",
		);
		return res.data.result ?? null;
	} catch (error) {
		if (
			axios.isAxiosError<BaseResponse<null>>(error) &&
			error.response?.status === 404 &&
			error.response.data.code === NO_RECOMMENDED_PARTNER_CODE
		) {
			return null;
		}

		throw error;
	}
}

export function useAdminPartnerRecommend() {
	return useQuery({
		queryKey: ["admin", "partner-recommend"],
		queryFn: fetchAdminPartnerRecommend,
	});
}
