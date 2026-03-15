import type { SelectItem } from "@/shared/ui/select";

// TODO: 백엔드 API 연동 시 실제 건의 대상 목록으로 교체
export const SUGGESTION_TARGET_ITEMS: SelectItem[] = [
	{ label: "총학생회", value: "general-student-council" },
	{ label: "IT대학 학생회", value: "it-college-student-council" },
	{ label: "컴퓨터학부 학생회", value: "computer-department-student-council" },
];
