import { z } from "zod";

export const benefitItemSchema = z.object({
	id: z.string(),
	serviceType: z.string(),
	criteria: z.enum(["금액", "인원수"]),
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

export type BenefitCriteria = "금액" | "인원수";
export type BenefitItem = z.infer<typeof benefitItemSchema>;
export type ProposalFormData = z.infer<typeof proposalSchema>;
