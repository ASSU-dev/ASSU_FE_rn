import { useMutation } from "@tanstack/react-query";
import { getCheckEmailAvailabilityApi } from "@/shared/api";

const { checkEmailAvailability } = getCheckEmailAvailabilityApi();

export function useCheckEmailAvailabilityMutation() {
	return useMutation({ mutationFn: checkEmailAvailability });
}
