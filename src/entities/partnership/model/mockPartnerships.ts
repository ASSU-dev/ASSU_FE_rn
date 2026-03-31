// [TEST] 목 데이터 — API 연동 전 UI 테스트용
import type { Partnership } from "./types";

export const MOCK_PARTNERSHIPS: Partnership[] = [
	{
		id: "1",
		storeName: "역전할머니맥주 숭실대점",
		benefitContent: "100,000원 이상 주문시 안주 1개 서비스",
		startDate: "2025-03-15",
		endDate: "2025-06-15",
	},
	{
		id: "2",
		storeName: "떠그릭 동작점",
		benefitContent: "학생증 제시시 10% 할인",
		startDate: "2025-02-01",
		endDate: "2025-08-31",
	},
	{
		id: "3",
		storeName: "카페 숭실",
		benefitContent: "아메리카노 1000원 할인",
		startDate: "2025-03-01",
		endDate: "2025-09-30",
	},
];
