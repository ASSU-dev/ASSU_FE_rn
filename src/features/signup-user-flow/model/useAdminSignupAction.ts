import { useCallback } from "react";
import { Alert } from "react-native";
import { apiInstance } from "@/shared/api";
import { assertSuccess } from "../lib/assertSuccess";
import { toAdminSignupBody } from "./signupPayloadAdapters";
import type { SignupFormState } from "./types";

type Params = {
	form: SignupFormState;
	onSuccess: () => void;
	onFailure: () => void;
};

export function useAdminSignupAction({ form, onSuccess, onFailure }: Params) {
	const signup = useCallback(async () => {
		try {
			const { request, signImage } = await toAdminSignupBody(form);
			const formData = new FormData();
			formData.append("request", JSON.stringify(request));
			formData.append("signImage", signImage as never);

			const response = await apiInstance.post("/auth/admins/signup", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			assertSuccess(response.data, "관리자 회원가입에 실패했습니다.");
			onSuccess();
		} catch (error) {
			Alert.alert(
				"회원가입 실패",
				error instanceof Error
					? error.message
					: "관리자 회원가입에 실패했습니다.",
				[{ text: "확인", onPress: onFailure }],
			);
		}
	}, [form, onFailure, onSuccess]);

	return { signup };
}
