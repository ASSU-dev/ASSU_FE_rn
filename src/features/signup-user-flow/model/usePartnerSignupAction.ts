import { useCallback } from "react";
import { Alert } from "react-native";
import { useSignupPartnerMutation } from "@/features/signup-user-flow/api/useSignupPartnerMutation";
import { assertSuccess } from "../lib/assertSuccess";
import { toPartnerSignupBody } from "./signupPayloadAdapters";
import type { SignupFormState } from "./types";

type Params = {
	form: SignupFormState;
	onSuccess: () => void;
	onFailure: () => void;
};

export function usePartnerSignupAction({ form, onSuccess, onFailure }: Params) {
	const mutation = useSignupPartnerMutation();

	const signup = useCallback(async () => {
		try {
			const { request, licenseImage } = await toPartnerSignupBody(form);
			const response = await mutation.mutateAsync({ request, licenseImage });
			assertSuccess(response, "제휴업체 회원가입에 실패했습니다.");
			onSuccess();
		} catch (error) {
			Alert.alert(
				"회원가입 실패",
				error instanceof Error
					? error.message
					: "제휴업체 회원가입에 실패했습니다.",
				[{ text: "확인", onPress: onFailure }],
			);
		}
	}, [form, mutation, onFailure, onSuccess]);

	return { signup };
}
