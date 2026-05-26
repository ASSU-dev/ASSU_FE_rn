import { useMutation } from "@tanstack/react-query";
import { getLoginStudentApi } from "@/shared/api";

const { loginStudent } = getLoginStudentApi();

export function useLoginStudentMutation() {
	return useMutation({ mutationFn: loginStudent });
}
