import { useMutation } from "@tanstack/react-query";
import { getCheckAuthNumberApi } from "@/shared/api";

const { checkAuthNumber } = getCheckAuthNumberApi();

export function useCheckAuthNumberMutation() {
	return useMutation({ mutationFn: checkAuthNumber });
}
