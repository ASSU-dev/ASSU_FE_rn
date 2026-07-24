import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useLoginStudentMutation } from "@/features/signup-user-flow/api/useLoginStudentMutation";
import { StudentTokenAuthPayloadDTOUniversity } from "@/shared/api";
import { ENV } from "@/shared/config/env";
import { assertSuccess } from "../lib/assertSuccess";
import { completeLogin } from "../lib/auth";

export function useStudentLoginAction() {
	const [isWebViewVisible, setWebViewVisible] = useState(false);
	const mutation = useLoginStudentMutation();

	const login = useCallback(
		async ({ sIdno, sToken }: { sIdno: string; sToken: string }) => {
			try {
				const response = await mutation.mutateAsync({
					sIdno,
					sToken,
					university: StudentTokenAuthPayloadDTOUniversity.SSU,
				});
				assertSuccess(response, "로그인에 실패했습니다.");

				const { tokens, role, basicInfo } = response.result;
				const homeRoute = await completeLogin(tokens ?? {}, role, basicInfo);
				setWebViewVisible(false);
				router.replace(homeRoute as never);
			} catch (error) {
				Alert.alert(
					"로그인 실패",
					error instanceof Error ? error.message : "로그인에 실패했습니다.",
				);
			}
		},
		[mutation],
	);

	const handlePressLmsLogin = useCallback(async () => {
		if (ENV.SSU_TEST_SIDNO && ENV.SSU_TEST_STOKEN) {
			await login({ sIdno: ENV.SSU_TEST_SIDNO, sToken: ENV.SSU_TEST_STOKEN });
			return;
		}
		setWebViewVisible(true);
	}, [login]);

	return {
		handlePressLmsLogin,
		loginWebView: {
			visible: isWebViewVisible,
			loginUrl: ENV.SSU_LOGIN_URL,
			close: () => setWebViewVisible(false),
			onVerifySuccess: login,
		},
	};
}
