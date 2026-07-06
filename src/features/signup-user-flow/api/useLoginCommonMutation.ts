import { useMutation } from "@tanstack/react-query";
import { getLoginCommonApi } from "@/shared/api";

const { loginCommon } = getLoginCommonApi();

export function useLoginCommonMutation() {
	return useMutation({ mutationFn: loginCommon });
}
