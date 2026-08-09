export interface Store {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface StoreMarker extends Store {
	storeId?: string;
	partnerId?: string;
	adminId?: string;
	count?: number;
	hasPartner: boolean;
	rate: number;
	benefit?: string;
	imageUri?: string;
	profileUrl?: string;
	phoneNumber?: string;
	partnershipId?: string;
	partnershipStartDate?: string;
	partnershipEndDate?: string;
}

export interface StudentStoreCardData extends Store {
	imageUri?: string;
	rating: number;
	reviewCount: number;
	priceRange?: string;
}

export interface AdminStoreCardData extends Store {
	imageUri?: string;
	partnershipStartDate?: string;
	partnershipEndDate?: string;
	isPartner: boolean;
}

export interface PopularStore {
	id: string;
	name: string;
	category?: string;
}

export interface SearchResultStore {
	id: string;
	name: string;
	storeId?: string;
	partnerId?: string;
	adminId?: string;
	imageUri?: string;
	// student view
	tag?: string;
	benefit?: string;
	// admin / partner view
	address?: string;
	rate?: number;
	latitude?: number;
	longitude?: number;
	profileUrl?: string;
	phoneNumber?: string;
	// partner-specific
	isPartner?: boolean;
	partnershipId?: string;
	partnershipStartDate?: string;
	partnershipEndDate?: string;
}

export interface BaseResponse<T> {
	isSuccess?: boolean;
	code?: string;
	message?: string;
	result?: T;
}

export interface TodayBestResponseDTO {
	bestStores?: string[];
}

export interface TodayBestStore {
	id: string;
	name: string;
}
