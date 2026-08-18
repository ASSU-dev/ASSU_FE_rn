import { useCallback } from "react";
import { Alert } from "react-native";
import { apiInstance, getApiErrorMessage } from "@/shared/api";
import { assertSuccess } from "../lib/assertSuccess";
import { toAdminSignupBody } from "./signupPayloadAdapters";
import type { SignupFormState } from "./types";

const DUPLICATE_ACCOUNT_MESSAGE = { 409: "이미 존재하는 계정입니다." };

type Params = {
	form: SignupFormState;
	onSuccess: () => void;
	onFailure: () => void;
};

export function useAdminSignupAction({ form, onSuccess, onFailure }: Params) {
	const signup = useCallback(async () => {
		try {
			const { request, signImage } = toAdminSignupBody(form);
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
				getApiErrorMessage(
					error,
					"관리자 회원가입에 실패했습니다.",
					DUPLICATE_ACCOUNT_MESSAGE,
				),
				[{ text: "확인", onPress: onFailure }],
			);
		}
	}, [form, onFailure, onSuccess]);

	return { signup };
}
