const MS_PER_MINUTE = 1000 * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

export function formatTimeAgo(date: Date): string {
	const diffMs = Date.now() - date.getTime();
	if (diffMs < MS_PER_MINUTE) return "방금 전";
	if (diffMs < MS_PER_HOUR) return `${Math.floor(diffMs / MS_PER_MINUTE)}분 전`;
	if (diffMs < MS_PER_DAY) return `${Math.floor(diffMs / MS_PER_HOUR)}시간 전`;
	return `${Math.floor(diffMs / MS_PER_DAY)}일 전`;
}
