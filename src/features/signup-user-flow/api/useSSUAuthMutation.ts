import { useMutation } from "@tanstack/react-query";
import { getSsuAuthApi } from "@/shared/api";

const { ssuAuth } = getSsuAuthApi();

export function useSSUAuthMutation() {
	return useMutation({ mutationFn: ssuAuth });
}
