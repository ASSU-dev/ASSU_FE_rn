import { useMutation } from "@tanstack/react-query";
import { getUnregisterApi } from "@/shared/api";

const { unregister } = getUnregisterApi();

export function useUnregisterDeviceMutation() {
	return useMutation({ mutationFn: unregister });
}
