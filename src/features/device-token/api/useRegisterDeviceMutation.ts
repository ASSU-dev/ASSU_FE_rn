import { useMutation } from "@tanstack/react-query";

import { getRegisterApi } from "@/shared/api";

const { register } = getRegisterApi();

export function useRegisterDeviceMutation() {
	return useMutation({ mutationFn: register });
}
