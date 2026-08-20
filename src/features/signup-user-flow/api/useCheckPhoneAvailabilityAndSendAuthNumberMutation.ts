import { useMutation } from "@tanstack/react-query";
import { getCheckPhoneAvailabilityAndSendAuthNumberApi } from "@/shared/api";

const { checkPhoneAvailabilityAndSendAuthNumber } =
	getCheckPhoneAvailabilityAndSendAuthNumberApi();

export function useCheckPhoneAvailabilityAndSendAuthNumberMutation() {
	return useMutation({ mutationFn: checkPhoneAvailabilityAndSendAuthNumber });
}
