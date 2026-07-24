import { useMutation } from "@tanstack/react-query";
import { getBlockApi } from "@/shared/api";

const { block } = getBlockApi();

export function useBlockMutation() {
	return useMutation({ mutationFn: block });
}
