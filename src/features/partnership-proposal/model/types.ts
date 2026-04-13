import { z } from "zod";
import {
	type BenefitCriteria,
	type BenefitItem,
	type DiscountBenefitItem,
	type EtcBenefitItem,
	SERVICE_TYPES,
	type ServiceBenefitItem,
	type ServiceType,
} from "@/entities/partnership";

// 엔티티 타입 re-export
export {
	SERVICE_TYPES,
	type BenefitCriteria,
	type BenefitItem,
	type DiscountBenefitItem,
	type EtcBenefitItem,
	type ServiceBenefitItem,
	type ServiceType,
};

// ─── 폼 내부 스키마 (react-hook-form 호환용 flat 구조) ───────────────────────
// discriminated union은 RHF의 배열 필드 경로 타입과 충돌하므로
// 폼 상태는 flat으로 유지하고, 제출 시 superRefine으로 타입별 검증한다.
export const benefitItemFormSchema = z.object({
	id: z.string(),
	serviceType: z.enum(SERVICE_TYPES),
	criteria: z.enum(["금액", "인원수"] as const),
	amount: z.string(),
	minCount: z.string(),
	categories: z.array(z.string()),
	items: z.array(z.string()),
	discountRate: z.string(),
	content: z.string(),
});

export type BenefitItemFormData = z.infer<typeof benefitItemFormSchema>;

// ─── 타입별 유효성 검사 ───────────────────────────────────────────────────────
const benefitsArraySchema = z
	.array(benefitItemFormSchema)
	.superRefine((benefits, ctx) => {
		benefits.forEach((b, i) => {
			if (b.serviceType === "서비스 제공" && b.items.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "제공 항목을 최소 1개 이상 입력해주세요",
					path: [i, "items"],
				});
			}
			if (b.serviceType === "할인 혜택" && !b.discountRate.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "할인율을 입력해주세요",
					path: [i, "discountRate"],
				});
			}
			if (b.serviceType === "기타 혜택" && !b.content.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "제휴 내용을 입력해주세요",
					path: [i, "content"],
				});
			}
		});
	});

export const proposalSchema = z.object({
	companyName: z.string().min(1, "업체명을 입력해주세요"),
	proposerName: z.string().min(1, "제안인 이름을 입력해주세요"),
	benefits: benefitsArraySchema,
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
	contractFile: z.object({ uri: z.string(), name: z.string() }).nullable(),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
