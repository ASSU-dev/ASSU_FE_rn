import { useMutation } from "@tanstack/react-query";
import { getRegisterApi } from "@/shared/api";

const { register } = getRegisterApi();

export function useRegisterMutation() {
	return useMutation({ mutationFn: register });
}
