import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { getHomeRouteByRole } from "@/shared/api/auth";
import { pickUploadFile } from "../lib/pickUploadFile";
import type { SignupFlowUiContextValue } from "./flowUiContext";
import { useAdminEmailAvailabilityAction } from "./useAdminEmailAvailabilityAction";
import { useAdminSignupAction } from "./useAdminSignupAction";
import { useCommonLoginAction } from "./useCommonLoginAction";
import { usePartnerSignupAction } from "./usePartnerSignupAction";
import { usePhoneVerificationAction } from "./usePhoneVerificationAction";
import { useSignupFlowPresentation } from "./useSignupFlowPresentation";
import { useSignupOverlays } from "./useSignupOverlays";
import { useSignupStepActions } from "./useSignupStepActions";
import { useStudentLoginAction } from "./useStudentLoginAction";
import { useStudentSignupAction } from "./useStudentSignupAction";
import { useStudentVerificationAction } from "./useStudentVerificationAction";

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
		markVerificationFailed,
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
		setAdminSealFile,
		setPartnerCompanyName,
		setPartnerOfficeAddress,
		setPartnerOfficeAddressDetail,
		setPartnerBusinessRegistrationFile,
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

	const handleVerified = useCallback(
		({
			sIdno,
			sToken,
			studentNumber,
			majorStr,
			name,
		}: {
			sIdno: string;
			sToken: string;
			studentNumber?: string;
			majorStr?: string;
			name?: string;
		}) => {
			setStudentAuthPayload({ sIdno, sToken });
			if (studentNumber) setStudentId(studentNumber);
			if (majorStr) setStudentMajor(majorStr);
			if (name) setProfileName(name);
			goTo("studentInput2");
		},
		[goTo, setProfileName, setStudentId, setStudentMajor],
	);

	const { handlePressVerify, webView: studentAuthWebView } =
		useStudentVerificationAction(handleVerified);

	const handleSignupFailure = useCallback(() => goTo("loginForm"), [goTo]);

	const { signup: handleStudentSignup } = useStudentSignupAction({
		studentAuthPayload,
		agreePrivacy: form.agreements.agreePrivacy,
		agreeMarketing: form.agreements.agreeMarketing,
		onSuccess: goNext,
		onFailure: handleSignupFailure,
	});

	const { signup: handlePartnerSignup } = usePartnerSignupAction({
		form,
		onSuccess: goNext,
		onFailure: handleSignupFailure,
	});

	const { signup: handleAdminSignup } = useAdminSignupAction({
		form,
		onSuccess: goNext,
		onFailure: handleSignupFailure,
	});
	const { checkEmailAvailability } = useAdminEmailAvailabilityAction();

	const { handlePressLmsLogin, loginWebView } = useStudentLoginAction();
	const { handlePressLogin, isPending: isCommonLoginPending } =
		useCommonLoginAction({
			email: form.auth.email,
			password: form.auth.password,
		});

	const { sendCode, verifyCode, isVerifying } = usePhoneVerificationAction({
		onCodeSent: sendVerificationCode,
		onVerifyFailed: markVerificationFailed,
		onVerified: goNext,
	});

	const sendIdentityVerificationCode = () => sendCode(form.identity.phone);

	const handlePickAdminSeal = useCallback(async () => {
		const file = await pickUploadFile();
		if (file) setAdminSealFile(file);
	}, [setAdminSealFile]);

	const handlePickPartnerBusinessRegistration = useCallback(async () => {
		const file = await pickUploadFile();
		if (file) setPartnerBusinessRegistrationFile(file);
	}, [setPartnerBusinessRegistrationFile]);

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
			onPressStudentVerify: handlePressVerify,
		},
		partner: {
			setPartnerEmail,
			setPartnerPassword,
			setPartnerCompanyName,
			setPartnerOfficeAddressDetail,
			onPickBusinessRegistration: handlePickPartnerBusinessRegistration,
		},
		admin: {
			setAdminEmail,
			setAdminPassword,
			setAdminOrganizationType,
			setAdminCollege,
			setAdminDepartment,
			setAdminOfficeAddressDetail,
			onPickSeal: handlePickAdminSeal,
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
			isBottomDisabled: isBottomDisabled || isVerifying,
			buttonLabel,
			onSegmentPress: (segmentIndex: number) => {
				if (segmentIndex >= currentProgressIndex) return;
				goTo(progressSteps[segmentIndex]);
			},
			onBottomButtonPress: async () => {
				if (step === "complete") {
					router.replace(getHomeRouteByRole(form.role) as never);
					return;
				}
				if (step === "identity") {
					if (FORCE_PHONE_VERIFICATION_BYPASS) {
						goNext();
						return;
					}
					await verifyCode(form.identity.phone, form.identity.verificationCode);
					return;
				}
				if (step === "studentInput3") {
					await handleStudentSignup();
					return;
				}
				if (step === "adminCredentials") {
					const isEmailAvailable = await checkEmailAvailability(
						form.admin.email,
					);
					if (!isEmailAvailable) return;
					goNext();
					return;
				}
				if (step === "adminSealRegistration") {
					await handleAdminSignup();
					return;
				}
				if (step === "partnerBusinessRegistration") {
					await handlePartnerSignup();
					return;
				}
				goNext();
			},
		}),
		[
			buttonLabel,
			currentProgressIndex,
			checkEmailAvailability,
			form.role,
			form.admin.email,
			form.identity.phone,
			form.identity.verificationCode,
			isVerifying,
			verifyCode,
			goNext,
			goTo,
			handlePartnerSignup,
			handleAdminSignup,
			handleStudentSignup,
			isBottomDisabled,
			progress,
			progressSteps,
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
			onPressLogin: handlePressLogin,
			isLoginPending: isCommonLoginPending,
			onPressLmsLogin: handlePressLmsLogin,
			onPressSignup: () => goTo("identity"),
		}),
		[
			form.auth.email,
			form.auth.password,
			goTo,
			handlePressLogin,
			handlePressLmsLogin,
			isCommonLoginPending,
			setAuthEmail,
			setAuthPassword,
		],
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
		studentAuthWebView,
		loginWebView,
	};
}
