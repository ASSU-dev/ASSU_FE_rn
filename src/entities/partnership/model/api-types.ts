export interface PartnershipOptionDTO {
	optionType: "SERVICE" | "DISCOUNT";
	criterionType: "PRICE" | "HEADCOUNT";
	anotherType: boolean;
	people?: number;
	cost?: number;
	note?: string;
	category?: string;
	discountRate?: number;
	goods: { goodsId: number; goodsName: string }[];
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
