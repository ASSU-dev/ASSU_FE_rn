// [TEST] 목 데이터 — API 연동 전 UI 테스트용
interface AffiliationSummary {
	imageUrl?: string;
	title: string;
	address: string;
	status?: "제휴중" | "제휴예정";
	dateRange?: string;
}

export const MOCK_AFFILIATION_SUMMARIES: AffiliationSummary[] = [
	{
		imageUrl:
			"https://www.figma.com/api/mcp/asset/b1ea7819-7170-4e36-84f4-70c0e9189d17",
		title: "역전할머니맥주 숭실대점",
		address: "서울 동작구 사당로 36-1 서정캐슬",
		status: "제휴예정",
		dateRange: "2025.02.24 ~ 2025.06.15",
	},
];
