import type { UserType } from "@/entities/user/model/types";
import { USER_TYPE } from "@/entities/user/model/types";
import type { SignupFlowVariant, SignupStep } from "./types";

type SignupFlowConfig = {
	stepOrder: SignupStep[];
	progressSteps: SignupStep[];
	progressByStep: Partial<Record<SignupStep, number>>;
	buttonLabelByStep: Partial<Record<SignupStep, string>>;
};

const SHARED_BUTTON_LABELS: Partial<Record<SignupStep, string>> = {
	identity: "인증완료",
	role: "확인",
	complete: "가입완료",
};

const CONTINUED_PROGRESS = {
	identity: 16.67,
	role: 50,
	postRoleEntry: 66.67,
	postRoleDetails: 83.33,
	finalize: 100,
} as const;

export const SIGNUP_FLOW_CONFIG: Record<SignupFlowVariant, SignupFlowConfig> = {
	student: {
		stepOrder: [
			"login1",
			"loginForm",
			"identity",
			"role",
			"school",
			"studentInput1",
			"studentInput2",
			"studentInput3",
			"complete",
		],
		progressSteps: [
			"identity",
			"role",
			"school",
			"studentInput1",
			"studentInput2",
			"studentInput3",
		],
		progressByStep: {
			identity: CONTINUED_PROGRESS.identity,
			role: CONTINUED_PROGRESS.role,
			school: CONTINUED_PROGRESS.postRoleEntry,
			studentInput1: CONTINUED_PROGRESS.postRoleDetails,
			studentInput2: CONTINUED_PROGRESS.postRoleDetails,
			studentInput3: CONTINUED_PROGRESS.postRoleDetails,
		},
		buttonLabelByStep: {
			...SHARED_BUTTON_LABELS,
			school: "완료",
			studentInput2: "완료",
			studentInput3: "완료",
		},
	},
	partner: {
		stepOrder: [
			"login1",
			"loginForm",
			"identity",
			"role",
			"partnerCredentials",
			"partnerCompanyInfo",
			"partnerBusinessRegistration",
			"complete",
		],
		progressSteps: [
			"identity",
			"role",
			"partnerCredentials",
			"partnerCompanyInfo",
			"partnerBusinessRegistration",
		],
		progressByStep: {
			identity: CONTINUED_PROGRESS.identity,
			role: CONTINUED_PROGRESS.role,
			partnerCredentials: CONTINUED_PROGRESS.postRoleEntry,
			partnerCompanyInfo: CONTINUED_PROGRESS.postRoleDetails,
			partnerBusinessRegistration: CONTINUED_PROGRESS.finalize,
		},
		buttonLabelByStep: {
			...SHARED_BUTTON_LABELS,
			partnerCredentials: "입력완료",
			partnerCompanyInfo: "입력완료",
			partnerBusinessRegistration: "완료",
		},
	},
	admin: {
		stepOrder: [
			"login1",
			"loginForm",
			"identity",
			"role",
			"adminCredentials",
			"adminOrganizationType",
			"adminOrganizationInfo",
			"adminSealRegistration",
			"complete",
		],
		progressSteps: [
			"identity",
			"role",
			"adminCredentials",
			"adminOrganizationType",
			"adminOrganizationInfo",
			"adminSealRegistration",
		],
		progressByStep: {
			identity: CONTINUED_PROGRESS.identity,
			role: CONTINUED_PROGRESS.role,
			adminCredentials: CONTINUED_PROGRESS.postRoleEntry,
			adminOrganizationType: CONTINUED_PROGRESS.postRoleDetails,
			adminOrganizationInfo: CONTINUED_PROGRESS.postRoleDetails,
			adminSealRegistration: CONTINUED_PROGRESS.finalize,
		},
		buttonLabelByStep: {
			...SHARED_BUTTON_LABELS,
			adminCredentials: "입력완료",
			adminOrganizationType: "입력완료",
			adminOrganizationInfo: "입력완료",
			adminSealRegistration: "완료",
		},
	},
};

export function getSignupFlowVariant(role: UserType | null): SignupFlowVariant {
	if (role === USER_TYPE.PARTNER) {
		return "partner";
	}

	if (role === USER_TYPE.ADMIN) {
		return "admin";
	}

	return "student";
}

export function getSignupFlowConfig(variant: SignupFlowVariant) {
	return SIGNUP_FLOW_CONFIG[variant];
}
