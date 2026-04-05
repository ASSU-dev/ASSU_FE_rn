import { isAdminOrganizationInfoComplete } from "./admin";
import type { SignupFormState, SignupStep } from "./types";

export function isSignupStepValid({
	step,
	form,
	secondsLeft,
}: {
	step: SignupStep;
	form: SignupFormState;
	secondsLeft: number;
}) {
	switch (step) {
		case "identity":
			return (
				form.identity.phone.length > 0 &&
				form.identity.verificationCode.length > 0 &&
				form.identity.isCodeSent &&
				secondsLeft > 0
			);
		case "role":
			return Boolean(form.role);
		case "adminCredentials":
			return form.admin.email.length > 0 && form.admin.password.length > 0;
		case "adminOrganizationType":
			return Boolean(form.admin.organizationType);
		case "school":
			return Boolean(form.student.school);
		case "partnerCredentials":
			return (
				form.partner.email.length > 0 && form.partner.password.length > 0
			);
		case "adminOrganizationInfo":
			return isAdminOrganizationInfoComplete(form.admin);
		case "adminSealRegistration":
			return (
				form.admin.sealFileName.length > 0 && form.agreements.agreePrivacy
			);
		case "partnerCompanyInfo":
			return (
				form.partner.companyName.length > 0 &&
				form.partner.officeAddress.length > 0 &&
				form.partner.officeAddressDetail.length > 0
			);
		case "partnerBusinessRegistration":
			return (
				form.partner.businessRegistrationFileName.length > 0 &&
				form.agreements.agreePrivacy
			);
		case "studentInput2":
		case "studentInput3":
			return form.agreements.agreePrivacy;
		default:
			return true;
	}
}
