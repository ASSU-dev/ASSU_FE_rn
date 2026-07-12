import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	BaseResponse,
	PagedResponse,
	WritePartnershipResponseDTO,
} from "../model/api-types";

async function fetchPartnerPartnerships(): Promise<
	PagedResponse<WritePartnershipResponseDTO>
> {
	const res = await apiInstance.get<
		BaseResponse<PagedResponse<WritePartnershipResponseDTO>>
	>("/partnership/partner");
	return res.data.result;
}

export function usePartnerPartnerships() {
	return useQuery({
		queryKey: ["partnership", "partner"],
		queryFn: fetchPartnerPartnerships,
	});
}
