import type { SignupStep } from "./types";

export const VERIFICATION_SUCCESS_CODE = "0502";

export const SIGNUP_PROGRESS_STEPS: SignupStep[] = [
	"identity",
	"role",
	"school",
	"studentInput1",
	"studentInput2",
	"studentInput3",
];
