import type { SignupAgreementState, SignupSchool } from "@/entities/signup";
import type { UserType } from "@/entities/user/model/types";

export type SignupStep =
	| "login1"
	| "loginForm"
	| "identity"
	| "role"
	| "adminCredentials"
	| "adminOrganizationType"
	| "adminOrganizationInfo"
	| "adminSealRegistration"
	| "school"
	| "studentInput1"
	| "studentInput2"
	| "studentInput3"
	| "partnerCredentials"
	| "partnerCompanyInfo"
	| "partnerBusinessRegistration"
	| "complete";

export type SignupFlowVariant = "student" | "partner" | "admin";

export type SignupAdminOrganizationType =
	| "GENERAL_STUDENT_COUNCIL"
	| "COLLEGE_STUDENT_COUNCIL"
	| "DEPARTMENT_STUDENT_COUNCIL";

export type SignupAuthFormState = {
	email: string;
	password: string;
};

export type SignupIdentityFormState = {
	phone: string;
	verificationCode: string;
	isCodeSent: boolean;
	verificationAttempted: boolean;
};

export type SignupStudentFormState = {
	school: SignupSchool | null;
	major: string;
	studentId: string;
};

export type SignupPartnerFormState = {
	email: string;
	password: string;
	companyName: string;
	officeAddressId: string | null;
	officeAddressDetail: string;
	businessRegistrationFileName: string;
};

export type SignupAdminFormState = {
	email: string;
	password: string;
	organizationType: SignupAdminOrganizationType | null;
	collegeId: string | null;
	departmentId: string | null;
	officeAddressId: string | null;
	officeAddressDetail: string;
	sealFileName: string;
};

export type SignupProfileState = {
	name: string;
};

export type SignupFormState = {
	auth: SignupAuthFormState;
	identity: SignupIdentityFormState;
	role: UserType | null;
	student: SignupStudentFormState;
	partner: SignupPartnerFormState;
	admin: SignupAdminFormState;
	agreements: SignupAgreementState;
	profile: SignupProfileState;
};
