export interface Benefit {
	id: string;
	storeName: string;
	date: string;
	time: string;
	description: string;
}

export interface ReviewableBenefit extends Benefit {
	storeId: number;
	partnerId: number;
	adminName: string;
	isReviewed: boolean;
}

export interface Partnership {
	id: string;
	storeName: string;
	benefitContent: string; // 제휴내용
	startDate: string; // YYYY-MM-DD
	endDate: string; // YYYY-MM-DD
}

/** 관리자 화면의 대기 중(SUSPEND) 제휴 계약서 목록 항목 */
export interface PendingContract {
	paperId: number;
	partnerName: string;
	/** YYYY-MM-DD */
	proposedAt: string;
}

/** 제휴 계약서 화면에 표시하는 혜택 (조건 · 혜택 · 유의사항) */
export interface ContractBenefitItem {
	id: string;
	benefitCondition?: string;
	benefit: string;
	caution?: string;
	minPeople?: number;
}

export interface PartnershipContract {
	id: string;
	companyName: string; // 제휴 제안업체명
	proposerName: string; // 제휴 제안인
	benefits: ContractBenefitItem[];
	startDate: string; // YYYY-MM-DD
	endDate: string; // YYYY-MM-DD
	contractDate: string; // YYYY-MM-DD (서명 날짜)
}
