import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useSSUAuthMutation } from "@/features/signup-user-flow/api/useSSUAuthMutation";
import { ENV } from "@/shared/config/env";
import { assertSuccess } from "../lib/assertSuccess";

type OnVerifiedParams = {
	sIdno: string;
	sToken: string;
	studentNumber?: string;
	majorStr?: string;
	name?: string;
};

export function useStudentVerificationAction(
	onVerified: (params: OnVerifiedParams) => void,
) {
	const [isWebViewVisible, setWebViewVisible] = useState(false);
	const mutation = useSSUAuthMutation();

	const verify = useCallback(
		async ({ sIdno, sToken }: { sIdno: string; sToken: string }) => {
			try {
				const response = await mutation.mutateAsync({ sIdno, sToken });
				assertSuccess(response, "유세인트 인증에 실패했습니다.");
				setWebViewVisible(false);
				onVerified({
					sIdno,
					sToken,
					studentNumber: response.result.studentNumber,
					majorStr: response.result.majorStr,
					name: response.result.name,
				});
			} catch (error) {
				Alert.alert(
					"인증 실패",
					error instanceof Error
						? error.message
						: "유세인트 인증에 실패했습니다.",
				);
			}
		},
		[mutation, onVerified],
	);

	const handlePressVerify = useCallback(async () => {
		if (ENV.SSU_TEST_SIDNO && ENV.SSU_TEST_STOKEN) {
			await verify({ sIdno: ENV.SSU_TEST_SIDNO, sToken: ENV.SSU_TEST_STOKEN });
			return;
		}
		setWebViewVisible(true);
	}, [verify]);

	return {
		handlePressVerify,
		webView: {
			visible: isWebViewVisible,
			loginUrl: ENV.SSU_LOGIN_URL,
			close: () => setWebViewVisible(false),
			onVerifySuccess: verify,
		},
	};
}
