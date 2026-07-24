export interface PartnershipBenefit {
	id: number;
	adminId: number;
	manager: string;
	contents: string;
	goods: string[];
	people: number | null;
	cost: number | null;
	type: "INDIVIDUAL" | "GROUP";
}

export interface VerifiedPartnershipStore {
	storeId: number;
	storeName: string;
	benefits: PartnershipBenefit[];
}

export interface PartnershipUsagePayload {
	storeId: number;
	adminId: number;
	tableNumber: "99";
	adminName: string;
	placeName: string;
	partnershipContent: string;
	contentId: number;
	discount?: number;
	userIds?: number[];
}
