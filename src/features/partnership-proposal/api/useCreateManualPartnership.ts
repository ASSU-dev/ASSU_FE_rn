import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SUSPENDED_PAPERS_QUERY_KEY } from "@/entities/partnership";
import { createManualPartnership } from "./createManualPartnership";

const ADMIN_PARTNERSHIPS_QUERY_KEY = ["partnership", "admin"] as const;

export function useCreateManualPartnership() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createManualPartnership,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ADMIN_PARTNERSHIPS_QUERY_KEY,
				}),
				queryClient.invalidateQueries({ queryKey: SUSPENDED_PAPERS_QUERY_KEY }),
			]);
		},
	});
}
