import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	BaseResponse,
	PagedResponse,
	WritePartnershipResponseDTO,
} from "../model/api-types";

async function fetchAdminPartnerships(): Promise<
	PagedResponse<WritePartnershipResponseDTO>
> {
	const res =
		await apiInstance.get<
			BaseResponse<PagedResponse<WritePartnershipResponseDTO>>
		>("/partnership/admin");
	return res.data.result;
}

export function useAdminPartnerships() {
	return useQuery({
		queryKey: ["partnership", "admin"],
		queryFn: fetchAdminPartnerships,
	});
}
