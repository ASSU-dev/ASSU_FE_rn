import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getMarkReadApi } from "@/shared/api";

const { markRead } = getMarkReadApi();

export function useMarkReadMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: markRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
	});
}
