export interface BlockedPartner {
	id: string;
	name: string;
	blockedAt: string;
}

export const MOCK_BLOCKED_PARTNERS: BlockedPartner[] = [
	{
		id: "1",
		name: "역전할머니맥주 숭실대점",
		blockedAt: "2025-03-25",
	},
	{
		id: "2",
		name: "떠그릭 동작점",
		blockedAt: "2025-03-24",
	},
	{
		id: "3",
		name: "카페 숭실",
		blockedAt: "2025-03-21",
	},
	{
		id: "4",
		name: "청년다방 숭실대점",
		blockedAt: "2025-03-18",
	},
];
