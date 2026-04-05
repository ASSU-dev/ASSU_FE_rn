import type { SelectItem } from "@/shared/ui/select";

export const ADMIN_ORGANIZATION_TYPE_OPTIONS: SelectItem[] = [
	{ label: "총학생회", value: "GENERAL_STUDENT_COUNCIL" },
	{ label: "단과대학 학생회", value: "COLLEGE_STUDENT_COUNCIL" },
	{ label: "학과/부 학생회", value: "DEPARTMENT_STUDENT_COUNCIL" },
];

export const ADMIN_COLLEGE_OPTIONS: SelectItem[] = [
	{ label: "인문대학", value: "HUMANITIES" },
	{ label: "자연과학대학", value: "NATURAL_SCIENCE" },
	{ label: "IT대학", value: "IT" },
	{ label: "공과대학", value: "ENGINEERING" },
	{ label: "사회과학대학", value: "SOCIAL_SCIENCE" },
];

export const ADMIN_DEPARTMENT_OPTIONS: SelectItem[] = [
	{ label: "컴퓨터학부", value: "COMPUTER" },
	{ label: "소프트웨어학부", value: "SOFTWARE" },
	{ label: "글로벌미디어학부", value: "GLOBAL_MEDIA" },
	{ label: "전자정보공학부", value: "EE" },
	{ label: "AI융합학과", value: "AI" },
];

