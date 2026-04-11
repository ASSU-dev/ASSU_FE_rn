import { z } from "zod";
import {
	type BenefitCriteria,
	type BenefitItem,
	SERVICE_TYPES,
	type ServiceType,
} from "@/entities/partnership";

// 엔티티 타입 re-export (기존 import 경로 유지)
export {
	SERVICE_TYPES,
	type BenefitCriteria,
	type BenefitItem,
	type ServiceType,
};

export const benefitItemSchema = z.object({
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

export const proposalSchema = z.object({
	companyName: z.string().min(1),
	proposerName: z.string().min(1),
	benefits: z.array(benefitItemSchema),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
	contractFile: z.object({ uri: z.string(), name: z.string() }).nullable(),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
