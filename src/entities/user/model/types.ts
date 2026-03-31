export const USER_TYPE = {
	STUDENT: "STUDENT",
	ADMIN: "ADMIN",
	PARTNER: "PARTNER",
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
