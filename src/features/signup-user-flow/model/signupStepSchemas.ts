import { z } from "zod";

export const identityStepSchema = z.object({
	phone: z.string().min(1),
	verificationCode: z.string().min(1),
});

export const schoolStepSchema = z.object({
	school: z
		.string()
		.min(1)
		.nullable()
		.refine((value) => value !== null),
});

export const credentialsStepSchema = z.object({
	email: z.string().min(1),
	password: z.string().min(1),
});

export const partnerCompanyInfoStepSchema = z.object({
	companyName: z.string().min(1),
	officeAddressId: z.string().min(1),
	officeAddressDetail: z.string().min(1),
});

export const adminOrganizationTypeStepSchema = z.object({
	organizationType: z
		.string()
		.min(1)
		.nullable()
		.refine((value) => value !== null),
});

export const adminOrganizationInfoStepSchema = z
	.object({
		organizationType: z.string().min(1).nullable(),
		collegeId: z.string().nullable(),
		departmentId: z.string().nullable(),
		officeAddressId: z.string().nullable(),
		officeAddressDetail: z.string(),
	})
	.superRefine((values, ctx) => {
		if (!values.organizationType) {
			return;
		}

		if (
			values.organizationType === "COLLEGE_STUDENT_COUNCIL" &&
			!values.collegeId
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["collegeId"],
				message: "단과대를 선택해주세요",
			});
		}

		if (
			values.organizationType === "DEPARTMENT_STUDENT_COUNCIL" &&
			(!values.collegeId || !values.departmentId)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["departmentId"],
				message: "학과/부를 선택해주세요",
			});
		}

		// Address is required only when the UI should show it
		const shouldRequireOfficeAddress =
			values.organizationType === "GENERAL_STUDENT_COUNCIL" ||
			(values.organizationType === "COLLEGE_STUDENT_COUNCIL" &&
				Boolean(values.collegeId)) ||
			(values.organizationType === "DEPARTMENT_STUDENT_COUNCIL" &&
				Boolean(values.collegeId && values.departmentId));

		if (shouldRequireOfficeAddress) {
			if (!values.officeAddressId) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["officeAddressId"],
					message: "사무실주소를 선택해주세요",
				});
			}

			if (
				!values.officeAddressDetail ||
				values.officeAddressDetail.trim().length === 0
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["officeAddressDetail"],
					message: "상세주소를 입력해주세요",
				});
			}
		}
	});

export const agreementStepSchema = z.object({
	agreeAll: z.boolean(),
	agreePrivacy: z.boolean(),
	agreeMarketing: z.boolean(),
});

export const fileAgreementStepSchema = agreementStepSchema.extend({
	fileName: z.string().min(1),
});

export type IdentityStepValues = z.infer<typeof identityStepSchema>;
export type SchoolStepValues = z.infer<typeof schoolStepSchema>;
export type CredentialsStepValues = z.infer<typeof credentialsStepSchema>;
export type PartnerCompanyInfoStepValues = z.infer<
	typeof partnerCompanyInfoStepSchema
>;
export type AdminOrganizationTypeStepValues = z.infer<
	typeof adminOrganizationTypeStepSchema
>;
export type AdminOrganizationInfoStepValues = z.infer<
	typeof adminOrganizationInfoStepSchema
>;
export type AgreementStepValues = z.infer<typeof agreementStepSchema>;
export type FileAgreementStepValues = z.infer<typeof fileAgreementStepSchema>;
