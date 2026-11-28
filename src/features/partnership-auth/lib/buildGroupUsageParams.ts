// 단체 인증의 인원 구성을 GA 파라미터로 만든다.
// count는 앱으로 인증한 인원(대표자 포함)이고, 필요 인원에서 뺀 값이 앱에서 검증되지 않은 인원이다.
export function buildGroupUsageParams(requiredPeople: number, count: number) {
	const appVerified = Math.min(Math.max(count, 0), requiredPeople);

	return {
		group_size: requiredPeople,
		group_app_verified: appVerified,
		group_unverified: requiredPeople - appVerified,
	};
}
