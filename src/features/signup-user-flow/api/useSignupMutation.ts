import { useMutation } from "@tanstack/react-query";
import { getSignupStudentApi } from "@/shared/api";

const { signupStudent } = getSignupStudentApi();

export function useSignupMutation() {
	return useMutation({ mutationFn: signupStudent });
}
