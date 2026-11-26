import type { LatLng } from "@/shared/types/map";
import type { StoreMarker } from "../model/types";

const EARTH_RADIUS_KM = 6371;

/** 두 좌표 간 거리(km) — Haversine 공식 */
export function getDistanceKm(a: LatLng, b: LatLng): number {
	const toRad = (deg: number) => (deg * Math.PI) / 180;
	const dLat = toRad(b.lat - a.lat);
	const dLng = toRad(b.lng - a.lng);
	const h =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
	return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** 1km 미만은 m, 이상은 소수 1자리 km 표기 */
export function formatDistance(km: number): string {
	if (km < 1) return `${Math.round(km * 1000)}m`;
	return `${km.toFixed(1)}km`;
}

/** 카드/마커 라벨에 표시할 대표 혜택 텍스트 */
export function getPrimaryBenefit(store: StoreMarker): string | undefined {
	return store.partnerships?.[0]?.benefits[0] ?? store.benefit;
}

/** 대표 혜택을 제외한 나머지 혜택 개수 — "외 N가지 제휴" */
export function countExtraBenefits(
	store: Pick<StoreMarker, "partnerships" | "benefit">,
): number {
	const total = store.partnerships
		? store.partnerships.reduce(
				(sum, partnership) => sum + partnership.benefits.length,
				0,
			)
		: store.benefit
			? 1
			: 0;
	return Math.max(total - 1, 0);
}

/** 카드 태그에 표시할 대표 학생회 이름 */
export function getPrimaryAdminName(store: StoreMarker): string | undefined {
	return store.partnerships?.[0]?.adminName;
}

/** 조건을 끝맺는 "시"("주문 시", "방문 시", "식사시,") — 뒤에 공백이나 쉼표가 오는 경우만 */
const CONDITION_END = /시(?=[\s,])/g;

/**
 * 첫 번째 조건 끝("~ 시")의 다음 위치를 반환한다. 없으면 -1.
 * "5시 이후"처럼 숫자 바로 뒤의 "시"는 시각이므로 조건 끝으로 보지 않는다.
 */
function findConditionEnd(text: string): number {
	for (const match of text.matchAll(CONDITION_END)) {
		const index = match.index ?? 0;
		const previous = text[index - 1];
		if (previous !== undefined && /\d/.test(previous)) continue;
		return index + 1;
	}
	return -1;
}

/**
 * 서버가 한 문장으로 내려주는 혜택을 조건(label)과 파란 강조(highlight)로 나눈다.
 * - "~ 시"가 있으면 거기까지가 조건(검정), 뒤는 혜택(파랑): "40,000원 이상 주문 시 현금 결제 5% 할인"
 * - "시" 바로 뒤에 쉼표가 붙은 형식도 같은 규칙이다: "4인이상 식사시, 음료제공"
 * - "~ 시"가 없으면 전체를 혜택(파랑)으로 둔다. 쉼표만으로는 나누지 않는다.
 */
export function splitBenefitText(benefit?: string): {
	label?: string;
	highlight?: string;
} {
	if (!benefit) return {};

	const conditionEnd = findConditionEnd(benefit);
	if (conditionEnd === -1) return { highlight: benefit };

	const rest = benefit.slice(conditionEnd);
	const highlight = rest.replace(/^[\s,]+/, "").trim();
	// 조건만 있고 혜택이 비어 있으면 나누지 않는다
	if (!highlight) return { highlight: benefit };

	const hasComma = rest.trimStart().startsWith(",");
	return {
		label: `${benefit.slice(0, conditionEnd)}${hasComma ? "," : ""} `,
		highlight,
	};
}

/** 혜택 조건(benefitCondition)·내용(benefit) 필드 → 조건(label) + 파란 강조(highlight) */
export function toBenefitTextParts(
	benefitCondition?: string | null,
	benefit?: string | null,
): { label?: string; highlight?: string } {
	const condition = benefitCondition?.trim();
	const content = benefit?.trim();
	return {
		label: condition ? `${condition}, ` : undefined,
		highlight: content || undefined,
	};
}
