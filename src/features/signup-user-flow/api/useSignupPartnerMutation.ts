import { useMutation } from "@tanstack/react-query";
import { getSignupPartnerApi } from "@/shared/api";

const { signupPartner } = getSignupPartnerApi();

export function useSignupPartnerMutation() {
	return useMutation({ mutationFn: signupPartner });
}
