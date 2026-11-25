export interface PaperContentResponseDto {
	adminId?: number | null;
	adminName?: string | null;
	/** "조건 + 혜택 (유의사항)" 한 줄 문구 */
	paperContent?: string | null;
	partnershipPeriod?: string | null;
	contentId?: number | null;
	benefitCondition?: string | null;
	benefit?: string | null;
	caution?: string | null;
	/** 그룹 인증 최소 인원 — 값이 있으면 그룹 인증 혜택 */
	minPeople?: number | null;
}

export interface StorePapersResponseDto {
	storeId?: number | null;
	storeName?: string | null;
	partnershipContents?: PaperContentResponseDto[] | null;
}

export interface StoreBenefit {
	id: string;
	adminId: number;
	adminName: string;
	paperContent: string;
	partnershipPeriod?: string;
	benefitCondition?: string;
	benefit: string;
	caution?: string;
	minPeople?: number;
	type: "INDIVIDUAL" | "GROUP";
}

export interface StorePapers {
	storeId: number;
	storeName: string;
	partnershipContents: StoreBenefit[];
}
