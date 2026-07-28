import { router } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";
import { useLoginCommonMutation } from "@/features/signup-user-flow/api/useLoginCommonMutation";
import { assertSuccess } from "../lib/assertSuccess";
import { completeLogin } from "../lib/auth";

type Params = {
	email: string;
	password: string;
};

export function useCommonLoginAction({ email, password }: Params) {
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
			);
			router.replace(homeRoute as never);
		} catch (error) {
			Alert.alert(
				"로그인 실패",
				error instanceof Error ? error.message : "로그인에 실패했습니다.",
			);
		}
	}, [email, mutation, password]);

	return {
		handlePressLogin,
		isPending: mutation.isPending,
	};
}
