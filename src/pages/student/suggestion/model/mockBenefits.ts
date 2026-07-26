// [TEST] 목 데이터 — API 연동 전 UI 테스트용
import type { Benefit, ReviewBenefitItem } from "./types";

export const MOCK_BENEFITS: Benefit[] = [
	{
		id: "1",
		storeName: "인쌩맥주 숭실대점",
		date: "2025-03-15",
		time: "18:36",
		description: "인쌩맥주에서 음료 한병을 제공받았어요!",
	},
	{
		id: "2",
		storeName: "스타벅스 숭실대입구점",
		date: "2025-03-10",
		time: "14:20",
		description: "아메리카노 1잔을 제공받았어요!",
	},
	{
		id: "3",
		storeName: "맥도날드 숭실대점",
		date: "2025-03-08",
		time: "12:00",
		description: "맥버거 세트를 제공받았어요!",
	},
	{
		id: "4",
		storeName: "CU 숭실대입구점",
		date: "2025-03-05",
		time: "09:30",
		description: "삼각김밥 1개를 제공받았어요!",
	},
	{
		id: "5",
		storeName: "파리바게뜨 상도점",
		date: "2025-03-01",
		time: "16:45",
		description: "크루아상 1개를 제공받았어요!",
	},
];

function padDatePart(value: number): string {
	return String(value).padStart(2, "0");
}

export function createCurrentMonthMockBenefit(now: Date): ReviewBenefitItem {
	const month = padDatePart(now.getMonth() + 1);
	const day = padDatePart(now.getDate());
	const hour = padDatePart(now.getHours());
	const minute = padDatePart(now.getMinutes());

	return {
		id: "mock-current-month-benefit",
		storeId: 0,
		partnerId: 0,
		adminName: "테스트 학생회",
		storeName: "테스트 1",
		date: [now.getFullYear(), month, day].join("-"),
		time: [hour, minute].join(":"),
		description: "테스트 1에서 테스트 혜택을 제공받았어요!",
		isReviewed: false,
		isMock: true,
	};
}
