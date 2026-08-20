import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	BaseResponse,
	PagedResponse,
	WritePartnershipResponseDTO,
} from "../model/api-types";

const ADMIN_PARTNERSHIP_LIST_PARAMS = {
	all: true,
	page: 0,
	size: 100,
} as const;

async function fetchAdminPartnerships(): Promise<
	PagedResponse<WritePartnershipResponseDTO>
> {
	const res = await apiInstance.get<
		BaseResponse<PagedResponse<WritePartnershipResponseDTO>>
	>("/partnership/admin", {
		params: ADMIN_PARTNERSHIP_LIST_PARAMS,
	});

	console.log("[fetchAdminPartnerships] 응답:", res.data);
	console.log(
		"[fetchAdminPartnerships] 첫 제휴업체:",
		JSON.stringify(res.data.result.content[0] ?? null),
	);

	return res.data.result;
}

export function useAdminPartnerships() {
	return useQuery({
		queryKey: ["partnership", "admin", ADMIN_PARTNERSHIP_LIST_PARAMS],
		queryFn: fetchAdminPartnerships,
	});
}
