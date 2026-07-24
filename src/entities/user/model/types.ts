import type { UserBasicInfo as AuthUserBasicInfo } from "@/shared/lib/auth/authStore";

export const USER_TYPE = {
	STUDENT: "STUDENT",
	ADMIN: "ADMIN",
	PARTNER: "PARTNER",
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export type UserBasicInfo = AuthUserBasicInfo;

export interface BaseResponse<T> {
	isSuccess?: boolean;
	code?: string;
	message?: string;
	result?: T;
}

export interface ProfileImageResponseDTO {
	url?: string | null;
}

export interface CheckStampResponseDTO {
	userId?: number;
	stamp?: number;
	message?: string;
}
