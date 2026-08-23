export interface PartnershipBenefit {
	id: number;
	adminId: number;
	manager: string;
	contents: string;
	goods: string[];
	people: number | null;
	cost: number | null;
	type: "INDIVIDUAL" | "GROUP";
	startDate?: string;
	endDate?: string;
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

export interface GroupCertificationSession {
	sessionId: number;
	requiredPeople: number;
	count: number;
	status: "WAITING" | "COMPLETED";
	userIds: number[];
	role: "REPRESENTATIVE" | "PARTICIPANT";
}

export interface GroupCertificationProgressMessage {
	type: string;
	count: number;
	message?: string;
	userIds?: number[];
}

export interface GroupCertificationQrPayload {
	type: "ASSU_GROUP_CERTIFICATION";
	version: 1;
	adminId: number;
	sessionId: number;
	storeId: number;
	storeName: string;
	contentId: number;
	adminName: string;
	partnershipContent: string;
	goods: string[];
	requiredPeople: number;
}
