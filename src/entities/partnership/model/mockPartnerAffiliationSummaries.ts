// [TEST] 제휴업체 메인페이지 추천 섹션 — API 연동 전 UI 테스트용
interface PartnerAffiliationSummary {
	title: string;
	address: string;
}

export const MOCK_PARTNER_AFFILIATION_SUMMARIES: PartnerAffiliationSummary[] = [
	{
		title: "숭실대학교\n경영학부 학생회",
		address: "서울 동작구 사당로 36-1 서정캐슬",
	},
	{
		title: "숭실대학교\n스포츠학부 학생회",
		address: "서울 동작구 사당로 36-1 서정캐슬",
	},
];
