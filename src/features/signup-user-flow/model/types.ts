export type SignupStep =
	| "login1"
	| "loginForm"
	| "identity"
	| "role"
	| "school"
	| "studentInput1"
	| "studentInput2"
	| "studentInput3"
	| "complete";

import type { SignupAgreementState, SignupSchool } from "@/entities/signup";
import type { UserType } from "@/entities/user/model/types";

export type SignupFormState = {
	email: string;
	password: string;
	phone: string;
	verificationCode: string;
	isCodeSent: boolean;
	verificationAttempted: boolean;
	role: UserType | null;
	school: SignupSchool | null;
	major: string;
	studentId: string;
} & SignupAgreementState & {
		name: string;
	};
