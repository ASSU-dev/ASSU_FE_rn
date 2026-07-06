import { router } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";
import { useLoginCommonMutation } from "@/features/signup-user-flow/api/useLoginCommonMutation";
import { assertSuccess } from "../lib/assertSuccess";
import { completeLogin } from "../lib/auth";

export function useCommonLoginAction() {
	const mutation = useLoginCommonMutation();

	const login = useCallback(
		async ({ email, password }: { email: string; password: string }) => {
			try {
				const response = await mutation.mutateAsync({ email, password });
				assertSuccess(response, "로그인에 실패했습니다.");

				const { tokens, role } = response.result;
				const homeRoute = await completeLogin(tokens ?? {}, role);
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

	return { login };
}
