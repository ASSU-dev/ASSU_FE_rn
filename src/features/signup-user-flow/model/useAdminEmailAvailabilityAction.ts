import { isAxiosError } from "axios";
import { useCallback } from "react";
import { Alert } from "react-native";
import { useCheckEmailAvailabilityMutation } from "@/features/signup-user-flow/api/useCheckEmailAvailabilityMutation";

export function useAdminEmailAvailabilityAction() {
	const mutation = useCheckEmailAvailabilityMutation();

	const checkEmailAvailability = useCallback(
		async (email: string) => {
			try {
				await mutation.mutateAsync({ email });
				return true;
			} catch (error) {
				const message =
					isAxiosError(error) && error.response?.status === 404
						? "이미 사용 중인 이메일입니다."
						: "이메일 중복확인에 실패했습니다.";
				Alert.alert("이메일 중복확인 실패", message);
				return false;
			}
		},
		[mutation],
	);

	return { checkEmailAvailability };
}
