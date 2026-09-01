import type { StoreBenefit } from "@/entities/store";

// 가게 상세 정보 화면 내 제휴 목록의 각 아이템의 제휴 혜택 정보의 텍스트 포맷팅하는 함수
export function formatBenefit(benefit: StoreBenefit) {
	const hasCondition = benefit.people != null || benefit.cost != null;

	const conditionText = (() => {
		const parts: string[] = [];
		if (benefit.people != null) parts.push(`${benefit.people}명 이상 이용 시`);
		if (benefit.cost != null)
			parts.push(`${benefit.cost.toLocaleString()}원 이상 시`);
		return parts.join(", ");
	})();

	const goodsText = benefit.goods.join(", ");

	return { hasCondition, conditionText, goodsText };
}
