import type { StoreBenefit } from "@/entities/store";

// 가게 상세 정보 화면 내 제휴 목록의 각 아이템의 제휴 혜택 정보의 텍스트 포맷팅하는 함수
export function formatBenefit(benefit: StoreBenefit) {
	const conditionText = benefit.benefitCondition ?? "";
	const hasCondition = conditionText.length > 0;
	const goodsText = benefit.benefit;

	return { hasCondition, conditionText, goodsText };
}
