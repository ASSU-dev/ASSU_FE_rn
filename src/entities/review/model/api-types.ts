export interface PageableParams {
	page?: number;
	size?: number;
	sort?: string;
}

export interface SortObjectDto {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}

export interface PageableObjectDto {
	offset: number;
	sort: SortObjectDto;
	paged: boolean;
	pageSize: number;
	pageNumber: number;
	unpaged: boolean;
}

export interface PageResponseDto<T> {
	totalPages: number;
	totalElements: number;
	size: number;
	content: T[];
	number: number;
	sort: SortObjectDto;
	first: boolean;
	last: boolean;
	pageable: PageableObjectDto;
	numberOfElements: number;
	empty: boolean;
}

export interface CheckReviewResponseDto {
	reviewId: number;
	storeId: number;
	affiliation: string;
	storeName: string;
	content: string;
	rate: number;
	createdAt: string;
	reviewImageUrls?: string[];
}

export interface StandardScoreResponseDto {
	score: number;
}

export interface WriteReviewRequestDto {
	content: string;
	rate: number;
	storeId: number;
	partnerId: number;
	partnershipUsageId: number;
	adminName: string;
}

export interface ReviewImageFile {
	uri: string;
	name: string;
	type: string;
}

export interface CreateReviewVariables {
	request: WriteReviewRequestDto;
	reviewImages?: ReviewImageFile[];
}

export interface WriteReviewResponseDto {
	reviewId: number;
	content: string;
	rate: number;
	createdAt: string;
	memberId: number;
	reviewImageUrls?: string[];
}

export interface DeleteReviewResponseDto {
	reviewId: number;
}
