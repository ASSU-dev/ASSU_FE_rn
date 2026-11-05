import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import { ENV } from "@/shared/config/env";
import type {
	BaseResponse,
	PartnershipDetailResponseDTO,
} from "../model/api-types";

async function fetchPartnershipDetail(
	id: string,
): Promise<PartnershipDetailResponseDTO> {
	if (__DEV__) {
		console.log("[PartnershipDebug] detail request", {
			baseURL: apiInstance.defaults.baseURL,
			endpoint: `/partnership/${id}`,
			partnershipId: id,
			usingMocks: ENV.USE_MOCKS,
		});
	}
	const res = await apiInstance.get<BaseResponse<PartnershipDetailResponseDTO>>(
		`/partnership/${id}`,
	);
	if (__DEV__) {
		console.log("[PartnershipDebug] detail response", {
			status: res.status,
			data: res.data,
		});
	}
	return res.data.result;
}

export function usePartnershipDetail(id: string | null) {
	return useQuery({
		queryKey: ["partnership", "detail", id],
		queryFn: () => fetchPartnershipDetail(id as string),
		enabled: id !== null,
	});
}
