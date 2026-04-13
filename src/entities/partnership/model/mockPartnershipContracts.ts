// [TEST] 목 데이터 — API 연동 전 UI 테스트용
import type { PartnershipContract } from "./types";

export const MOCK_PARTNERSHIP_CONTRACTS: PartnershipContract[] = [
	{
		id: "1",
		companyName: "역전할머니맥주 숭실대점",
		proposerName: "숭실대학교 총학생회",
		benefits: [
			{
				id: "b1",
				serviceType: "서비스 제공",
				criteria: "인원수",
				amount: "",
				minCount: "4",
				categories: [],
				items: ["캔 음료"],
			},
			{
				id: "b2",
				serviceType: "서비스 제공",
				criteria: "인원수",
				amount: "",
				minCount: "6",
				categories: [],
				items: ["안주 1개"],
			},
		],
		startDate: "2025-03-15",
		endDate: "2025-06-15",
		contractDate: "2025-03-01",
	},
	{
		id: "2",
		companyName: "떠그릭 동작점",
		proposerName: "숭실대학교 총학생회",
		benefits: [
			{
				id: "b1",
				serviceType: "할인 혜택",
				criteria: "금액",
				amount: "10000",
				minCount: "",
				discountRate: "10",
			},
		],
		startDate: "2025-02-01",
		endDate: "2025-08-31",
		contractDate: "2025-01-25",
	},
	{
		id: "3",
		companyName: "카페 숭실",
		proposerName: "숭실대학교 총학생회",
		benefits: [
			{
				id: "b1",
				serviceType: "기타 혜택",
				content: "아메리카노 1000원 할인",
			},
		],
		startDate: "2025-03-01",
		endDate: "2025-09-30",
		contractDate: "2025-02-20",
	},
];
