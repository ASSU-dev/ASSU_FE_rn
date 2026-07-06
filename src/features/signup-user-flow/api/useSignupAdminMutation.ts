import { useMutation } from "@tanstack/react-query";
import { getSignupAdminApi } from "@/shared/api";

const { signupAdmin } = getSignupAdminApi();

export function useSignupAdminMutation() {
	return useMutation({ mutationFn: signupAdmin });
}
