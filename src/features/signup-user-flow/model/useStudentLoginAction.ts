import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useLoginStudentMutation } from "@/features/signup-user-flow/api/useLoginStudentMutation";
import { StudentTokenAuthPayloadDTOUniversity } from "@/shared/api";
import { ENV } from "@/shared/config/env";
import { assertSuccess } from "../lib/assertSuccess";
import { completeLogin } from "../lib/auth";
import { getLoginErrorMessage } from "../lib/getLoginErrorMessage";

export function useStudentLoginAction() {
	const [isWebViewVisible, setWebViewVisible] = useState(false);
	const mutation = useLoginStudentMutation();

	const login = useCallback(
		async ({ sIdno, sToken }: { sIdno: string; sToken: string }) => {
			if (__DEV__)
				console.log("[LMS LOGIN] auth payload received", {
					sIdnoLength: sIdno.length,
					sTokenLength: sToken.length,
				});

			try {
				const response = await mutation.mutateAsync({
					sIdno,
					sToken,
					university: StudentTokenAuthPayloadDTOUniversity.SSU,
				});
				assertSuccess(response, "로그인에 실패했습니다.");

				const { tokens, role, basicInfo, memberId } = response.result;
				if (__DEV__)
					console.log("[LMS LOGIN] API success", {
						role,
						hasAccessToken: Boolean(tokens?.accessToken),
						hasRefreshToken: Boolean(tokens?.refreshToken),
					});
				if (__DEV__) console.log("[LMS LOGIN] saving session");
				const homeRoute = await completeLogin(
					tokens ?? {},
					role,
					basicInfo,
					memberId,
				);
				if (__DEV__) console.log("[LMS LOGIN] session saved", { homeRoute });
				setWebViewVisible(false);
				if (__DEV__) console.log("[LMS LOGIN] WebView close requested");
				router.replace(homeRoute as never);
				if (__DEV__) console.log("[LMS LOGIN] navigation requested");
			} catch (error) {
				if (__DEV__)
					console.log("[LMS LOGIN] post-auth failure", {
						name: error instanceof Error ? error.name : "UnknownError",
						message:
							error instanceof Error ? error.message : "로그인에 실패했습니다.",
					});

				Alert.alert("로그인 실패", getLoginErrorMessage(error));
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
