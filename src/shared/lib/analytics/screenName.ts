// Expo Router 세그먼트를 GA 화면명으로 변환한다.
// - 그룹 세그먼트("(protected)", "(tabs)" 등)는 URL에 드러나지 않으므로 제외
// - 동적 세그먼트는 "[storeId]"처럼 그대로 남아 실제 ID가 화면명에 섞이지 않음
// 예: ["(protected)", "student", "store", "[storeId]", "detail"] → "student/store/[storeId]/detail"
// 화면을 그리지 않고 리다이렉트만 하는 index 경로는 빈 문자열을 반환한다.
export function toScreenName(segments: readonly string[]): string {
	return segments
		.filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")))
		.filter((segment) => segment !== "index")
		.join("/");
}
