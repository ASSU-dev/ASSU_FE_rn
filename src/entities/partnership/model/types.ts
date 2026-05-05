export const SERVICE_TYPES = ["서비스 제공", "할인 혜택", "기타 혜택"] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];
export type BenefitCriteria = "금액" | "인원수";

// 서비스 제공 / 할인 혜택 공통 base
interface CriteriaBenefitBase {
	id: string;
	criteria: BenefitCriteria;
	amount: string;
	minCount: string;
}

export interface ServiceBenefitItem extends CriteriaBenefitBase {
	serviceType: "서비스 제공";
	categories: string[];
	items: string[];
}

export interface DiscountBenefitItem extends CriteriaBenefitBase {
	serviceType: "할인 혜택";
	discountRate: string;
}

export interface EtcBenefitItem {
	id: string;
	serviceType: "기타 혜택";
	content: string;
}

export type BenefitItem =
	| ServiceBenefitItem
	| DiscountBenefitItem
	| EtcBenefitItem;

export interface Partnership {
	id: string;
	storeName: string;
	benefitContent: string; // 제휴내용
	startDate: string; // YYYY-MM-DD
	endDate: string; // YYYY-MM-DD
}

export interface PartnershipContract {
	id: string;
	companyName: string; // 제휴 제안업체명
	proposerName: string; // 제휴 제안인
	benefits: BenefitItem[];
	startDate: string; // YYYY-MM-DD
	endDate: string; // YYYY-MM-DD
	contractDate: string; // YYYY-MM-DD (서명 날짜)
}
