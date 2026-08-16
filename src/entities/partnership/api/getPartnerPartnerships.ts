import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
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
	const res = await apiInstance.get<
		BaseResponse<PagedResponse<WritePartnershipResponseDTO>>
	>("/partnership/partner", {
		params: PARTNER_PARTNERSHIP_LIST_PARAMS,
	});
	return res.data.result;
}

export function usePartnerPartnerships() {
	return useQuery({
		queryKey: ["partnership", "partner", PARTNER_PARTNERSHIP_LIST_PARAMS],
		queryFn: fetchPartnerPartnerships,
	});
}
