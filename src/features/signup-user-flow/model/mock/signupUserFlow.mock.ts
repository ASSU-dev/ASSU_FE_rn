import type { SignupFormState } from "../types";

export const DEFAULT_SIGNUP_FORM_STATE: SignupFormState = {
	auth: {
		email: "",
		password: "",
	},
	identity: {
		phone: "",
		verificationCode: "",
		isCodeSent: false,
		verificationAttempted: false,
	},
	role: null,
	student: {
		school: "숭실대학교",
		major: "글로벌미디어학부",
		studentId: "20231649",
	},
	partner: {
		email: "",
		password: "",
		companyName: "",
		officeAddressId: null,
		officeAddress: "",
		officeAddressDetail: "",
		businessRegistrationFileName: "",
	},
	admin: {
		email: "",
		password: "",
		organizationType: null,
		collegeId: null,
		collegeName: "",
		departmentId: null,
		departmentName: "",
		officeAddressId: null,
		officeAddress: "",
		officeAddressDetail: "",
		sealFileName: "",
	},
	agreements: {
		agreeAll: false,
		agreePrivacy: false,
		agreeMarketing: false,
	},
	profile: {
		name: "김숭실",
	},
};
