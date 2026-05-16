import type { SignupAgreementState } from "@/entities/signup";

export function getNextAgreementState(
	current: SignupAgreementState,
	partial: Partial<SignupAgreementState>,
): SignupAgreementState {
	const next = { ...current, ...partial };
	return {
		...next,
		agreeAll: next.agreePrivacy && next.agreeMarketing,
	};
}
