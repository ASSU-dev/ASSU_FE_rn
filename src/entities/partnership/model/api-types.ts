export interface PartnershipOptionDTO {
	contentId?: number;
	/** 혜택 조건 — 조건이 없는 혜택은 null */
	benefitCondition?: string | null;
	/** 혜택 내용 (필수) */
	benefit: string;
	/** 유의사항 */
	caution?: string | null;
	/** 그룹 인증 최소 인원 */
	minPeople?: number | null;
}

export interface WritePartnershipResponseDTO {
	partnershipId: number;
	partnershipPeriodStart: string;
	partnershipPeriodEnd: string;
	adminId: number;
	partnerId: number | null;
	storeId: number;
	storeName: string;
	adminName: string;
	isActivated: "ACTIVE" | "INACTIVE" | "SUSPEND" | "BLANK";
	options: PartnershipOptionDTO[];
}

export interface PartnershipDetailResponseDTO {
	partnershipId: number;
	updatedAt: string;
	partnershipPeriodStart: string;
	partnershipPeriodEnd: string;
	adminId: number;
	partnerId: number | null;
	storeId: number;
	options: PartnershipOptionDTO[];
}

/** GET /partnership/suspended 응답 항목 (대기 중인 제휴 계약서) */
export interface SuspendedPaperResponseDTO {
	paperId: number;
	partnerName: string;
	/** LocalDateTime, 예: "2024-01-01T09:00:00" */
	createdAt: string;
}

export interface PagedResponse<T> {
	content: T[];
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	first: boolean;
	last: boolean;
	empty: boolean;
}

export interface AdminRecommendResponseDTO {
	partnerId: number;
	partnerName: string;
	partnerAddress: string;
	partnerDetailAddress?: string;
	partnerUrl?: string;
	partnerPhone?: string;
}

export interface AdminLiteDTO {
	adminId: number;
	adminName: string;
	adminAddress: string;
	adminDetailAddress?: string;
	adminUrl?: string;
	adminPhone?: string;
}

export interface PartnerRecommendResponseDTO {
	admins: AdminLiteDTO[];
}

export interface BaseResponse<T> {
	isSuccess: boolean;
	code: string;
	message: string;
	result: T;
}

/** GET /students/partnerships/{year}/{month} */
export interface UsageDetailDto {
	partnershipUsageId: number;
	storeName: string;
	storeId: number;
	partnerId: number;
	adminName: string;
	usedAt: string;
	benefitDescription: string;
	isReviewed: boolean;
}

export interface MyPartnershipDto {
	serviceCount: number;
	details: UsageDetailDto[];
}
