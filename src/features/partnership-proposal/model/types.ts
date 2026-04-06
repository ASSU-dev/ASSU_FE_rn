export type BenefitCriteria = "금액" | "인원수";

export type BenefitItem = {
	id: string;
	serviceType: string;
	criteria: BenefitCriteria;
	amount: string;
	minCount: string;
	categories: string[];
	items: string[];
	discountRate: string;
	content: string;
};

export type ProposalInfoForm = {
	companyName: string;
	proposerName: string;
};

export type ProposalContractForm = {
	startDate: string | null;
	endDate: string | null;
	contractFile: { uri: string; name: string } | null;
};
