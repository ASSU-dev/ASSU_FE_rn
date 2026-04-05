import { useSignupFlowPresentation } from "./useSignupFlowPresentation";
import { useSignupFlowViewModel } from "./useSignupFlowViewModel";
import { useSignupLoginViewModel } from "./useSignupLoginViewModel";
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

	const flow = useSignupFlowViewModel({
		step,
		progress,
		progressSteps,
		currentProgressIndex,
		showProgress,
		showBottomButton,
		isBottomDisabled,
		buttonLabel,
		goTo,
		goNext,
	});

	const login = useSignupLoginViewModel({
		email: form.auth.email,
		password: form.auth.password,
		onChangeEmail: setAuthEmail,
		onChangePassword: setAuthPassword,
		onPressSignup: () => goTo("identity"),
	});

	return {
		formMethods,
		flow,
		login,
		stepContent: {
			step,
			countdown,
			completeDisplayName,
			isVerificationError,
			actions: stepContentActions,
		},
		overlays,
	};
}
