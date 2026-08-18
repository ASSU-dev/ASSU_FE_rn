import { useCallback } from "react";
import { Alert } from "react-native";
import { useSignupMutation } from "@/features/signup-user-flow/api/useSignupMutation";
import {
	getApiErrorMessage,
	StudentTokenAuthPayloadDTOUniversity,
} from "@/shared/api";
import { assertRequestSucceeded } from "../lib/assertSuccess";

const DUPLICATE_ACCOUNT_MESSAGE = { 409: "이미 존재하는 계정입니다." };

type Params = {
	studentAuthPayload: { sIdno: string; sToken: string } | null;
	agreePrivacy: boolean;
	agreeMarketing: boolean;
	onSuccess: () => void;
	onFailure: () => void;
};

export function useStudentSignupAction({
	studentAuthPayload,
	agreePrivacy,
	agreeMarketing,
	onSuccess,
	onFailure,
}: Params) {
	const mutation = useSignupMutation();

	const signup = useCallback(async () => {
		if (!studentAuthPayload) {
			Alert.alert("인증 필요", "먼저 LMS 인증을 진행해주세요.");
			return;
		}

		try {
			const response = await mutation.mutateAsync({
				locationAgree: agreePrivacy,
				marketingAgree: agreeMarketing,
				studentTokenAuth: {
					sIdno: studentAuthPayload.sIdno,
					sToken: studentAuthPayload.sToken,
					university: StudentTokenAuthPayloadDTOUniversity.SSU,
				},
			});
			assertRequestSucceeded(response, "회원가입에 실패했습니다.");
			onSuccess();
		} catch (error) {
			Alert.alert(
				"회원가입 실패",
				getApiErrorMessage(
					error,
					"회원가입에 실패했습니다.",
					DUPLICATE_ACCOUNT_MESSAGE,
				),
				[{ text: "확인", onPress: onFailure }],
			);
		}
	}, [
		agreeMarketing,
		agreePrivacy,
		mutation,
		onFailure,
		onSuccess,
		studentAuthPayload,
	]);

	return { signup };
}
