import { USER_TYPE } from "@/entities/user/model/types";
import type { SelectItem } from "@/shared/ui/select/types";
import type { SignupRoleOption } from "../types";

export const SCHOOL_SELECT_OPTIONS: SelectItem[] = [
	{ label: "숭실대학교", value: "숭실대학교" },
];

export const SIGNUP_ROLE_OPTIONS: SignupRoleOption[] = [
	{ label: "관리자", value: USER_TYPE.ADMIN },
	{ label: "제휴업체", value: USER_TYPE.PARTNER },
	{ label: "사용자", value: USER_TYPE.STUDENT },
];
