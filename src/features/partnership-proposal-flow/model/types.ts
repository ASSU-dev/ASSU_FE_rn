export type BenefitCriteria = "금액" | "인원수";

export type BenefitItem = {
	id: string;
	serviceType: string;
	criteria: BenefitCriteria[];
	amount: string;
	items: string[];
};

export type ProposalStep1Form = {
	companyName: string;
	proposerName: string;
};

export type ProposalStep2Form = {
	startDate: string | null;
	endDate: string | null;
	contractFile: { uri: string; name: string } | null;
};
