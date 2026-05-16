import { router } from "expo-router";
import { useMemo } from "react";
import type { SignupFlowUiContextValue } from "./flowUiContext";
import { useSignupFlowPresentation } from "./useSignupFlowPresentation";
import { useSignupOverlays } from "./useSignupOverlays";
import { useSignupStepActions } from "./useSignupStepActions";

export function useSignupFlowController() {
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
		setRole,
		setSchool,
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

	const overlays = useSignupOverlays({
		adminOfficeAddressId: form.admin.officeAddressId,
		partnerOfficeAddressId: form.partner.officeAddressId,
		onSendVerificationCode: sendVerificationCode,
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
			sendVerificationCode,
		},
		student: {
			setRole,
			setSchool,
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
					: goNext,
		}),
		[
			buttonLabel,
			currentProgressIndex,
			goNext,
			goTo,
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
	};
}
