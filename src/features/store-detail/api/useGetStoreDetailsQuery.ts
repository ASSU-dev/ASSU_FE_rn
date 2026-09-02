import { useQuery } from "@tanstack/react-query";
import { getGetStoreDetailsApi } from "@/shared/api";

const { getStoreDetails } = getGetStoreDetailsApi();

export function useGetStoreDetailsQuery(storeId: number) {
	return useQuery({
		queryKey: ["getStoreDetails", storeId],
		queryFn: () => getStoreDetails(storeId),
	});
}
