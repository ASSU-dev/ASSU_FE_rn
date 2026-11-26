import { isAxiosError } from "axios";
import { router } from "expo-router";
import { useCallback } from "react";
import { useLoginCommonMutation } from "@/features/signup-user-flow/api/useLoginCommonMutation";
import { assertSuccess } from "../lib/assertSuccess";
import { completeLogin } from "../lib/auth";
import { getLoginErrorMessage } from "../lib/getLoginErrorMessage";
import type { ShowNotice } from "./noticeDialog";

type Params = {
	email: string;
	password: string;
	returnTo?: string;
	showNotice: ShowNotice;
};

export function useCommonLoginAction({
	email,
	password,
	returnTo,
	showNotice,
}: Params) {
	const mutation = useLoginCommonMutation();

	const handlePressLogin = useCallback(async () => {
		try {
			const response = await mutation.mutateAsync({ email, password });
			assertSuccess(response, "로그인에 실패했습니다.");

			const { tokens, role, basicInfo, memberId } = response.result;
			const homeRoute = await completeLogin(
				tokens ?? {},
				role,
				basicInfo,
				memberId,
				returnTo,
			);
			router.replace(homeRoute as never);
		} catch (error) {
			if (
				isAxiosError(error) &&
				error.response?.status === 403 &&
				error.response.data?.code === "MEMBER_4017"
			) {
				showNotice(
					"가입 승인 대기 중",
					"가입 승인 대기 중입니다. 백오피스 승인 후 로그인할 수 있습니다.",
				);
				return;
			}

			showNotice("로그인 실패", getLoginErrorMessage(error));
		}
	}, [email, mutation, password, returnTo, showNotice]);

	return {
		handlePressLogin,
		isPending: mutation.isPending,
	};
}
