import { useQuery } from "@tanstack/react-query";
import { getGetBlockListApi } from "@/shared/api";

const { getBlockList } = getGetBlockListApi();

export function useGetBlockListQuery() {
	return useQuery({
		queryKey: ["getBlockList"],
		queryFn: getBlockList,
	});
}
