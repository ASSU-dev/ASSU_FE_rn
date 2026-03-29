// 제휴 건의함 목업 데이터 — API 연동 전 테스트용 더미 건의 목록

import type { Suggestion } from "./types";

export const mockSuggestions: Suggestion[] = [
	{
		id: "1",
		storeName: "인쌩맥주",
		department: "글로벌미디어학부",
		studentStatus: "재학생",
		content:
			"제휴 이벤트 잘 이용하고 있어요!!! 취향이나 인쌩맥주 제휴 희망합니다 👍🏻",
		createdAt: new Date("2025-03-15T18:36:00"),
	},
	{
		id: "2",
		storeName: "역전할머니맥주",
		department: "컴퓨터학부",
		studentStatus: "재학생",
		content: "역전할머니 맥주 파인애플 샤베트 먹구싶어용",
		createdAt: new Date("2025-03-15T18:36:00"),
	},
	{
		id: "3",
		storeName: "상도로3가",
		department: "언론홍보학과",
		studentStatus: "휴학생",
		content:
			"상도로3가 너무 비싸요. 할인 제휴 있으면 맨날 갈 거 같아요!!!! 10프로 할인정도 가능할까요 하하",
		createdAt: new Date("2025-03-15T18:36:00"),
	},
	{
		id: "4",
		storeName: "스타벅스 숭실대점",
		department: "경영학부",
		studentStatus: "재학생",
		content: "학교 근처 스타벅스 제휴해주시면 자주 이용할 것 같아요!",
		createdAt: new Date("2025-03-14T10:20:00"),
	},
	{
		id: "5",
		storeName: "올리브영",
		department: "사회복지학부",
		studentStatus: "졸업생",
		content:
			"올리브영 할인 제휴 생기면 정말 좋겠어요. 많은 학생들이 이용할 듯해요.",
		createdAt: new Date("2025-03-13T15:05:00"),
	},
];

export const mockEmptySuggestions: Suggestion[] = [];
