import { useQuery } from "@tanstack/react-query";
import type { GetUsablePartnershipParams } from "@/shared/api";
import { getGetUsablePartnershipApi } from "@/shared/api";

const { getUsablePartnership } = getGetUsablePartnershipApi();

export function useGetUsablePartnershipQuery(
	params?: GetUsablePartnershipParams,
) {
	return useQuery({
		queryKey: ["getUsablePartnership", params],
		queryFn: () => getUsablePartnership(params),
	});
}
