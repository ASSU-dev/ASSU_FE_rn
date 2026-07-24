export type { Benefit } from "@/entities/partnership";

// YYYY-MM-DD 형식의 날짜 문자열에서 월(1~12)을 추출한다
export function getMonthFromDateStr(dateStr: string): number {
	return new Date(dateStr).getMonth() + 1;
}
