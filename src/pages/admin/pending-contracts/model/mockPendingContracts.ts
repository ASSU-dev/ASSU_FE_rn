export interface PendingContract {
	id: string;
	partnerName: string;
	proposedAt: string;
}

export const MOCK_PENDING_CONTRACTS: PendingContract[] = [
	{ id: "1", partnerName: "역전할머니맥주 숭실대점", proposedAt: "2025-03-25" },
	{ id: "2", partnerName: "떠그릭 동작점", proposedAt: "2025-03-25" },
	{ id: "3", partnerName: "카페 숭실", proposedAt: "2025-03-25" },
	{ id: "4", partnerName: "청년다방 숭실대점", proposedAt: "2025-03-25" },
];
