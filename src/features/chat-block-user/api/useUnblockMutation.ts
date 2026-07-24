import { useMutation } from "@tanstack/react-query";
import { getUnblockApi } from "@/shared/api";

const { unblock } = getUnblockApi();

export function useUnblockMutation() {
	return useMutation({ mutationFn: unblock });
}
