import { useQuery } from "@tanstack/react-query";
import type { GetUsablePartnershipParams } from "@/shared/api";
import { getGetUsablePartnershipApi } from "@/shared/api";
import { apiInstance } from "@/shared/api/instance";

const { getUsablePartnership } = getGetUsablePartnershipApi();

export function useGetUsablePartnershipQuery(
	params?: GetUsablePartnershipParams,
) {
	return useQuery({
		queryKey: ["getUsablePartnership", params],
		queryFn: async () => {
			if (__DEV__) {
				console.log("[PartnershipDebug] usable request", {
					baseURL: apiInstance.defaults.baseURL,
					params: params ?? null,
				});
			}
			const response = await getUsablePartnership(params);
			if (__DEV__) {
				console.log("[PartnershipDebug] usable response", {
					params: params ?? null,
					isSuccess: response.isSuccess,
					code: response.code,
					count: response.result?.length ?? 0,
					stores: response.result?.map((item) => ({
						storeId: item.storeId,
						partnershipId: item.partnershipId,
						name: item.partnerName,
						adminName: item.adminName,
						category: item.category,
					})),
				});
			}
			return response;
		},
	});
}
