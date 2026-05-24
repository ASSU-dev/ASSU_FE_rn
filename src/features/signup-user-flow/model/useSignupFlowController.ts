import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useSignupMutation } from "@/features/signup-user-flow/api/useSignupMutation";
import { useSSUAuthMutation } from "@/features/signup-user-flow/api/useSSUAuthMutation";
import { StudentTokenAuthPayloadDTOUniversity } from "@/shared/api";
import { ENV } from "@/shared/config/env";
import type { SignupFlowUiContextValue } from "./flowUiContext";
import { useSignupFlowPresentation } from "./useSignupFlowPresentation";
import { useSignupOverlays } from "./useSignupOverlays";
import { useSignupStepActions } from "./useSignupStepActions";

export function useSignupFlowController() {
	const FORCE_PHONE_VERIFICATION_BYPASS = false;
	const {
		step,
		form,
		formMethods,
		progress,
		countdown,
		goTo,
		goNext,
		setAuthEmail,
		setAuthPassword,
		setPhone,
		setVerificationCode,
		sendVerificationCode,
		setIdentityVerified,
		setRole,
		setSchool,
		setStudentMajor,
		setStudentId,
		setProfileName,
		setPartnerEmail,
		setPartnerPassword,
		setAdminEmail,
		setAdminPassword,
		setAdminOrganizationType,
		setAdminCollege,
		setAdminDepartment,
		setAdminOfficeAddress,
		setAdminOfficeAddressDetail,
		selectAdminSealMock,
		setPartnerCompanyName,
		setPartnerOfficeAddress,
		setPartnerOfficeAddressDetail,
		selectPartnerBusinessRegistrationMock,
		progressSteps,
		currentProgressIndex,
		showProgress,
		showBottomButton,
		isBottomDisabled,
		isVerificationError,
		buttonLabel,
		completeDisplayName,
		agreementHandlers,
	} = useSignupFlowPresentation();
	const [studentAuthPayload, setStudentAuthPayload] = useState<{
		sIdno: string;
		sToken: string;
	} | null>(null);
	const [isStudentAuthWebViewVisible, setStudentAuthWebViewVisible] =
		useState(false);
	const ssuAuthMutation = useSSUAuthMutation();
	const signupStudentMutation = useSignupMutation();
	const verifyStudentWithSsu = useCallback(
		async ({ sIdno, sToken }: { sIdno: string; sToken: string }) => {
			try {
				const response = await ssuAuthMutation.mutateAsync({ sIdno, sToken });
				const result = response.result;
				if (!response.isSuccess || !result) {
					Alert.alert(
						"인증 실패",
						response.message ?? "유세인트 인증에 실패했습니다.",
					);
					return;
				}

				setStudentAuthPayload({ sIdno, sToken });
				if (result.studentNumber) {
					setStudentId(result.studentNumber);
				}
				if (result.majorStr) {
					setStudentMajor(result.majorStr);
				}
				if (result.name) {
					setProfileName(result.name);
				}

				setStudentAuthWebViewVisible(false);
				goTo("studentInput2");
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "유세인트 인증에 실패했습니다.";
				Alert.alert("인증 실패", message);
			}
		},
		[goTo, setProfileName, setStudentId, setStudentMajor, ssuAuthMutation],
	);

	const handleStudentSsuVerify = useCallback(async () => {
		if (ENV.SSU_TEST_SIDNO && ENV.SSU_TEST_STOKEN) {
			await verifyStudentWithSsu({
				sIdno: ENV.SSU_TEST_SIDNO,
				sToken: ENV.SSU_TEST_STOKEN,
			});
			return;
		}

		setStudentAuthWebViewVisible(true);
	}, [verifyStudentWithSsu]);

	const handleStudentWebViewVerified = useCallback(
		async (payload: { sIdno: string; sToken: string }) => {
			await verifyStudentWithSsu(payload);
		},
		[verifyStudentWithSsu],
	);

	const handleStudentSignup = useCallback(async () => {
		if (!studentAuthPayload) {
			Alert.alert("인증 필요", "먼저 LMS 인증을 진행해주세요.");
			return;
		}

		try {
			const response = await signupStudentMutation.mutateAsync({
				locationAgree: form.agreements.agreePrivacy,
				marketingAgree: form.agreements.agreeMarketing,
				studentTokenAuth: {
					sIdno: studentAuthPayload.sIdno,
					sToken: studentAuthPayload.sToken,
					university: StudentTokenAuthPayloadDTOUniversity.SSU,
				},
			});

			if (!response.isSuccess) {
				Alert.alert(
					"회원가입 실패",
					response.message ?? "회원가입에 실패했습니다.",
				);
				return;
			}

			goNext();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "회원가입에 실패했습니다.";
			Alert.alert("회원가입 실패", message);
		}
	}, [
		form.agreements.agreeMarketing,
		form.agreements.agreePrivacy,
		goNext,
		signupStudentMutation,
		studentAuthPayload,
	]);

	const sendIdentityVerificationCode = () => {
		sendVerificationCode();
	};

	const overlays = useSignupOverlays({
		adminOfficeAddressId: form.admin.officeAddressId,
		partnerOfficeAddressId: form.partner.officeAddressId,
		onSendVerificationCode: sendIdentityVerificationCode,
		onSelectAdminOfficeAddress: setAdminOfficeAddress,
		onSelectPartnerOfficeAddress: setPartnerOfficeAddress,
	});

	const stepContentActions = useSignupStepActions({
		step,
		goTo,
		overlays: {
			openResendSheet: overlays.resendSheet.open,
			openPartnerAddressSearch: overlays.addressSearch.openForPartner,
			openAdminAddressSearch: overlays.addressSearch.openForAdmin,
		},
		identity: {
			setPhone,
			setVerificationCode,
			sendVerificationCode: sendIdentityVerificationCode,
		},
		student: {
			setRole,
			setSchool,
			onPressStudentVerify: handleStudentSsuVerify,
		},
		partner: {
			setPartnerEmail,
			setPartnerPassword,
			setPartnerCompanyName,
			setPartnerOfficeAddressDetail,
			selectPartnerBusinessRegistrationMock,
		},
		admin: {
			setAdminEmail,
			setAdminPassword,
			setAdminOrganizationType,
			setAdminCollege,
			setAdminDepartment,
			setAdminOfficeAddressDetail,
			selectAdminSealMock,
		},
		agreementHandlers,
	});

	const flow = useMemo(
		() => ({
			step,
			progress,
			progressSteps,
			currentProgressIndex,
			showProgress,
			showBottomButton,
			isBottomDisabled,
			buttonLabel,
			onSegmentPress: (segmentIndex: number) => {
				if (segmentIndex >= currentProgressIndex) {
					return;
				}

				goTo(progressSteps[segmentIndex]);
			},
			onBottomButtonPress:
				step === "complete"
					? () => router.replace("/(protected)/(student)/(tabs)/home" as never)
					: async () => {
							if (step === "identity") {
								if (FORCE_PHONE_VERIFICATION_BYPASS) {
									setIdentityVerified();
									goNext();
									return;
								}
							}

							if (step === "studentInput3") {
								await handleStudentSignup();
								return;
							}

							goNext();
						},
		}),
		[
			buttonLabel,
			currentProgressIndex,
			goNext,
			goTo,
			handleStudentSignup,
			isBottomDisabled,
			progress,
			progressSteps,
			setIdentityVerified,
			showBottomButton,
			showProgress,
			step,
		],
	);

	const login = useMemo(
		() => ({
			email: form.auth.email,
			password: form.auth.password,
			onChangeEmail: setAuthEmail,
			onChangePassword: setAuthPassword,
			onPressLogin: () => {
				console.log("로그인 성공");
			},
			onPressSignup: () => goTo("identity"),
		}),
		[form.auth.email, form.auth.password, goTo, setAuthEmail, setAuthPassword],
	);

	return {
		formMethods,
		flow,
		login,
		flowUi: {
			step,
			countdown,
			completeDisplayName,
			isVerificationError,
			actions: stepContentActions,
		} satisfies SignupFlowUiContextValue,
		overlays,
		studentAuthWebView: {
			visible: isStudentAuthWebViewVisible,
			loginUrl: ENV.SSU_LOGIN_URL,
			close: () => setStudentAuthWebViewVisible(false),
			onVerifySuccess: handleStudentWebViewVerified,
		},
	};
}
