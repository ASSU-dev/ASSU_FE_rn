import { USER_TYPE } from "@/entities/user/model/types";
import { getAdminCompletionName } from "./admin";
import type { SignupFormState } from "./types";

export function toStudentSignupPayload(form: SignupFormState) {
	return {
		role: USER_TYPE.STUDENT,
		email: form.auth.email,
		password: form.auth.password,
		phone: form.identity.phone,
		school: form.student.school,
		major: form.student.major,
		studentId: form.student.studentId,
		agreements: {
			agreePrivacy: form.agreements.agreePrivacy,
			agreeMarketing: form.agreements.agreeMarketing,
		},
	};
}

export function toPartnerSignupPayload(form: SignupFormState) {
	return {
		role: USER_TYPE.PARTNER,
		email: form.partner.email,
		password: form.partner.password,
		phone: form.identity.phone,
		companyName: form.partner.companyName,
		officeAddressId: form.partner.officeAddressId,
		officeAddress: form.partner.officeAddress,
		officeAddressDetail: form.partner.officeAddressDetail,
		businessRegistrationFileName: form.partner.businessRegistrationFileName,
		agreements: {
			agreePrivacy: form.agreements.agreePrivacy,
			agreeMarketing: form.agreements.agreeMarketing,
		},
	};
}

export function toAdminSignupPayload(form: SignupFormState) {
	return {
		role: USER_TYPE.ADMIN,
		email: form.admin.email,
		password: form.admin.password,
		phone: form.identity.phone,
		organizationType: form.admin.organizationType,
		collegeId: form.admin.collegeId,
		departmentId: form.admin.departmentId,
		officeAddressId: form.admin.officeAddressId,
		officeAddress: form.admin.officeAddress,
		officeAddressDetail: form.admin.officeAddressDetail,
		sealFileName: form.admin.sealFileName,
		displayName: getAdminCompletionName(form.admin),
		agreements: {
			agreePrivacy: form.agreements.agreePrivacy,
			agreeMarketing: form.agreements.agreeMarketing,
		},
	};
}
