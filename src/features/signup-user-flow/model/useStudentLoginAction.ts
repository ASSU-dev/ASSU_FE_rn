import { isAxiosError } from "axios";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useLoginStudentMutation } from "@/features/signup-user-flow/api/useLoginStudentMutation";
import { StudentTokenAuthPayloadDTOUniversity } from "@/shared/api";
import { ENV } from "@/shared/config/env";
import { assertSuccess } from "../lib/assertSuccess";
import { completeLogin } from "../lib/auth";
import { getLoginErrorMessage } from "../lib/getLoginErrorMessage";
import type { ShowNotice } from "./noticeDialog";

const SIGNUP_REQUIRED_ERROR_CODE = "MEMBER_4001";

function isSignupRequiredError(error: unknown) {
	if (!isAxiosError(error)) {
		return false;
	}

	return (
		error.response?.status === 404 &&
		(error.response.data as { code?: string } | undefined)?.code ===
			SIGNUP_REQUIRED_ERROR_CODE
	);
}

export function useStudentLoginAction(
	returnTo: string | undefined,
	onSignupRequired: (() => void) | undefined,
	showNotice: ShowNotice,
) {
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
					returnTo,
				);
				if (__DEV__) console.log("[LMS LOGIN] session saved", { homeRoute });
				setWebViewVisible(false);
				if (__DEV__) console.log("[LMS LOGIN] WebView close requested");
				router.replace(homeRoute as never);
				if (__DEV__) console.log("[LMS LOGIN] navigation requested");
			} catch (error) {
				if (isSignupRequiredError(error)) {
					setWebViewVisible(false);
					onSignupRequired?.();
					return;
				}

				if (__DEV__)
					console.log("[LMS LOGIN] post-auth failure", {
						name: error instanceof Error ? error.name : "UnknownError",
						message:
							error instanceof Error ? error.message : "로그인에 실패했습니다.",
					});

				// 웹뷰 모달이 열린 채로는 안내 다이얼로그가 가려질 수 있어 먼저 닫는다
				setWebViewVisible(false);
				showNotice("로그인 실패", getLoginErrorMessage(error));
			}
		},
		[mutation, onSignupRequired, returnTo, showNotice],
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
