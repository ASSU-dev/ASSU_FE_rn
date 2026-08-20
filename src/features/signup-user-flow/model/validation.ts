import {
	adminOrganizationInfoStepSchema,
	adminOrganizationTypeStepSchema,
	agreementStepSchema,
	credentialsStepSchema,
	fileAgreementStepSchema,
	identityStepSchema,
	partnerCompanyInfoStepSchema,
	schoolStepSchema,
} from "./signupStepSchemas";
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
				identityStepSchema.safeParse({
					phone: form.identity.phone,
					verificationCode: form.identity.verificationCode,
				}).success &&
				form.identity.isCodeSent &&
				secondsLeft > 0
			);
		case "role":
			return Boolean(form.role);
		case "adminCredentials":
			return credentialsStepSchema.safeParse({
				email: form.admin.email,
				password: form.admin.password,
			}).success;
		case "adminOrganizationType":
			return adminOrganizationTypeStepSchema.safeParse({
				organizationType: form.admin.organizationType,
			}).success;
		case "school":
			return schoolStepSchema.safeParse({
				school: form.student.school,
			}).success;
		case "partnerCredentials":
			return credentialsStepSchema.safeParse({
				email: form.partner.email,
				password: form.partner.password,
			}).success;
		case "adminOrganizationInfo":
			return adminOrganizationInfoStepSchema.safeParse({
				organizationType: form.admin.organizationType,
				collegeId: form.admin.collegeId,
				departmentId: form.admin.departmentId,
				officeAddressId: form.admin.officeAddressId,
				officeAddressDetail: form.admin.officeAddressDetail,
			}).success;
		case "adminSealRegistration":
			return (
				fileAgreementStepSchema.safeParse({
					file: form.admin.sealFile,
					agreeAll: form.agreements.agreeAll,
					agreePrivacy: form.agreements.agreePrivacy,
					agreeMarketing: form.agreements.agreeMarketing,
				}).success && form.agreements.agreePrivacy
			);
		case "partnerCompanyInfo":
			return partnerCompanyInfoStepSchema.safeParse({
				companyName: form.partner.companyName,
				officeAddressId: form.partner.officeAddressId,
				officeAddressDetail: form.partner.officeAddressDetail,
			}).success;
		case "partnerBusinessRegistration":
			return (
				fileAgreementStepSchema.safeParse({
					file: form.partner.businessRegistrationFile,
					agreeAll: form.agreements.agreeAll,
					agreePrivacy: form.agreements.agreePrivacy,
					agreeMarketing: form.agreements.agreeMarketing,
				}).success && form.agreements.agreePrivacy
			);
		case "studentInput2":
		case "studentInput3":
			return (
				agreementStepSchema.safeParse({
					agreeAll: form.agreements.agreeAll,
					agreePrivacy: form.agreements.agreePrivacy,
					agreeMarketing: form.agreements.agreeMarketing,
				}).success && form.agreements.agreePrivacy
			);
		default:
			return true;
	}
}
