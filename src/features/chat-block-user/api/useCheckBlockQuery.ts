import { useQuery } from "@tanstack/react-query";
import { getCheckBlockApi } from "@/shared/api";

const { checkBlock } = getCheckBlockApi();

export function useCheckBlockQuery(opponentId: number) {
	return useQuery({
		queryKey: ["checkBlock", opponentId],
		queryFn: () => checkBlock(opponentId),
	});
}
