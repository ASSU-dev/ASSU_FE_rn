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
