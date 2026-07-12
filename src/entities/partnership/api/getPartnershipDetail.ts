import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type {
	BaseResponse,
	PartnershipDetailResponseDTO,
} from "../model/api-types";

async function fetchPartnershipDetail(
	id: string,
): Promise<PartnershipDetailResponseDTO> {
	const res = await apiInstance.get<BaseResponse<PartnershipDetailResponseDTO>>(
		`/partnership/${id}`,
	);
	return res.data.result;
}

export function usePartnershipDetail(id: string | null) {
	return useQuery({
		queryKey: ["partnership", "detail", id],
		queryFn: () => fetchPartnershipDetail(id as string),
		enabled: id !== null,
	});
}
