import { useCallback } from "react";
import { Alert } from "react-native";
import { getApiErrorMessage } from "@/shared/api";
import { useCheckAuthNumberMutation } from "../api/useCheckAuthNumberMutation";
import { useCheckPhoneAvailabilityAndSendAuthNumberMutation } from "../api/useCheckPhoneAvailabilityAndSendAuthNumberMutation";

/** 서버가 요구하는 휴대폰 번호 형식 (PhoneAuthSendRequestDTO.phoneNumber) */
const PHONE_NUMBER_PATTERN = /^010\d{8}$/;

function normalizePhoneNumber(phone: string) {
	return phone.replace(/\D/g, "");
}

type Params = {
	/** 발송 성공 시 호출. 코드 입력 UI 노출 및 타이머 시작 */
	onCodeSent: () => void;
	/** 검증 실패 시 호출. 입력칸에 에러 표시 */
	onVerifyFailed: () => void;
	/** 검증 성공 시 호출. 다음 스텝으로 이동 */
	onVerified: () => void;
};

export function usePhoneVerificationAction({
	onCodeSent,
	onVerifyFailed,
	onVerified,
}: Params) {
	const sendMutation = useCheckPhoneAvailabilityAndSendAuthNumberMutation();
	const verifyMutation = useCheckAuthNumberMutation();

	const sendCode = useCallback(
		async (phone: string) => {
			const phoneNumber = normalizePhoneNumber(phone);
			if (!PHONE_NUMBER_PATTERN.test(phoneNumber)) {
				Alert.alert(
					"전화번호 확인",
					"010으로 시작하는 11자리 숫자를 입력해주세요.",
				);
				return;
			}

			try {
				const response = await sendMutation.mutateAsync({ phoneNumber });
				if (response.isSuccess === false) {
					throw new Error(response.message ?? "인증번호 발송에 실패했습니다.");
				}
				onCodeSent();
			} catch (error) {
				Alert.alert(
					"인증번호 발송 실패",
					getApiErrorMessage(error, "인증번호 발송에 실패했습니다."),
				);
			}
		},
		[onCodeSent, sendMutation],
	);

	const verifyCode = useCallback(
		async (phone: string, authNumber: string) => {
			const phoneNumber = normalizePhoneNumber(phone);

			try {
				const response = await verifyMutation.mutateAsync({
					phoneNumber,
					authNumber,
				});
				if (response.isSuccess === false) {
					throw new Error(response.message ?? "전화번호 인증에 실패했습니다.");
				}
				onVerified();
			} catch (error) {
				onVerifyFailed();
				Alert.alert(
					"인증 실패",
					getApiErrorMessage(error, "전화번호 인증에 실패했습니다."),
				);
			}
		},
		[onVerified, onVerifyFailed, verifyMutation],
	);

	return {
		sendCode,
		verifyCode,
		isSending: sendMutation.isPending,
		isVerifying: verifyMutation.isPending,
	};
}
