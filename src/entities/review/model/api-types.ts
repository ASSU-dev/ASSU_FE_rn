export interface PageableParams {
	page?: number;
	size?: number;
	sort?: string[];
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
