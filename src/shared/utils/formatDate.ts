type DateInput = Date | string | number;

/**
 * 날짜를 `YYYY.MM.DD` 형태로 포맷합니다. (기본: ko-KR)
 *
 * - Date, timestamp(number), ISO string(string) 모두 허용
 * - invalid date면 빈 문자열 반환
 */
export function formatDate(
	input: DateInput,
	options?: {
		locale?: string;
		separator?: "." | "-" | "/";
	}
): string {
	const date = toDate(input);
	if (!date) return "";

	const separator = options?.separator ?? ".";
	const year = String(date.getFullYear());
	const month = pad2(date.getMonth() + 1);
	const day = pad2(date.getDate());

	return [year, month, day].join(separator);
}

/**
 * 날짜+시간을 `YYYY.MM.DD HH:mm` 형태로 포맷합니다.
 * - invalid date면 빈 문자열 반환
 */
export function formatDateTime(
	input: DateInput,
	options?: {
		separator?: "." | "-" | "/";
	}
): string {
	const date = toDate(input);
	if (!date) return "";

	const separator = options?.separator ?? ".";
	const ymd = formatDate(date, { separator });
	const hh = pad2(date.getHours());
	const mm = pad2(date.getMinutes());

	return `${ymd} ${hh}:${mm}`;
}

function toDate(input: DateInput): Date | null {
	const date = input instanceof Date ? input : new Date(input);
	if (Number.isNaN(date.getTime())) return null;
	return date;
}

function pad2(n: number): string {
	return String(n).padStart(2, "0");
}
