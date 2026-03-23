import type { SignupFormState } from "../types";

export const DEFAULT_SIGNUP_FORM_STATE: SignupFormState = {
	email: "email@example.com",
	password: "yourpassword",
	phone: "",
	verificationCode: "",
	isCodeSent: false,
	verificationAttempted: false,
	role: null,
	school: "숭실대학교",
	major: "글로벌미디어학부",
	studentId: "20231649",
	agreeAll: false,
	agreePrivacy: false,
	agreeMarketing: false,
	name: "김숭실",
};
