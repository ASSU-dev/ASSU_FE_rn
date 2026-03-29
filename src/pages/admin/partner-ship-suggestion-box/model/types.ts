// 제휴 건의함 도메인 타입 — Suggestion 데이터 구조 정의

export type Suggestion = {
	id: string;
	storeName: string;
	department: string;
	studentStatus: string;
	content: string;
	createdAt: Date;
};
