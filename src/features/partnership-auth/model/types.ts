import type { AuthMethod, EntryPoint } from "@/shared/lib/analytics/events";

export interface PartnershipBenefit {
	id: number;
	adminId: number;
	manager: string;
	contents: string;
	partnershipPeriod?: string;
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

// GA 이벤트 파라미터를 혜택 선택 이후 화면까지 이어 주기 위해 보관한다.
export interface PartnershipAnalyticsContext {
	entryPoint?: EntryPoint;
	authMethod: AuthMethod;
}

export interface GroupCertificationSessionDetail {
	store: VerifiedPartnershipStore;
	benefit: PartnershipBenefit;
	session: GroupCertificationSession;
}

export interface GroupCertificationProgressMessage {
	type: string;
	count: number;
	message?: string;
	userIds?: number[];
}

export interface GroupCertificationQrPayload {
	sessionId: number;
	adminId: number;
}
