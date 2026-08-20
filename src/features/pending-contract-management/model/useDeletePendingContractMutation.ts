import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SUSPENDED_PAPERS_QUERY_KEY } from "@/entities/partnership";
import { deleteSuspendedPaper } from "../api/deleteSuspendedPaper";

export function useDeletePendingContractMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteSuspendedPaper,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: SUSPENDED_PAPERS_QUERY_KEY,
			});
		},
	});
}
