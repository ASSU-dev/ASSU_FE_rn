import { useQuery } from "@tanstack/react-query";
import { getListApi } from "@/shared/api";

const { list } = getListApi();

export function useListQuery() {
	return useQuery({
		queryKey: ["list"],
		queryFn: () => list(),
	});
}
