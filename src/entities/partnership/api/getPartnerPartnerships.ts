import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import { ENV } from "@/shared/config/env";
import { toPartnerPartnership } from "../lib/adapters";
import type {
	BaseResponse,
	PagedResponse,
	WritePartnershipResponseDTO,
} from "../model/api-types";

const PARTNER_PARTNERSHIP_LIST_PARAMS = {
	all: true,
	page: 0,
	size: 100,
} as const;

async function fetchPartnerPartnerships(): Promise<
	PagedResponse<WritePartnershipResponseDTO>
> {
	if (__DEV__) {
		console.log("[PartnershipDebug] partner list request", {
			baseURL: apiInstance.defaults.baseURL,
			endpoint: "/partnership/partner",
			params: PARTNER_PARTNERSHIP_LIST_PARAMS,
			usingMocks: ENV.USE_MOCKS,
		});
	}
	const res = await apiInstance.get<
		BaseResponse<PagedResponse<WritePartnershipResponseDTO>>
	>("/partnership/partner", {
		params: PARTNER_PARTNERSHIP_LIST_PARAMS,
	});
	if (__DEV__) {
		console.log("[PartnershipDebug] partner list response", {
			status: res.status,
			data: res.data,
		});
		console.log(
			"[PartnershipDebug] partner list cards mapped for display",
			res.data.result.content.map(toPartnerPartnership),
		);
	}
	return res.data.result;
}

export function usePartnerPartnerships() {
	return useQuery({
		queryKey: ["partnership", "partner", PARTNER_PARTNERSHIP_LIST_PARAMS],
		queryFn: fetchPartnerPartnerships,
	});
}
