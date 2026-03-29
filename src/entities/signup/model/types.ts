import type { UserType } from "@/entities/user/model/types";

export type SignupSchool = "숭실대학교";

export type SignupAgreementState = {
	agreeAll: boolean;
	agreePrivacy: boolean;
	agreeMarketing: boolean;
};

export type SignupRoleOption = {
	label: string;
	value: UserType;
};
