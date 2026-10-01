import type { StoreBenefit } from "@/entities/store";

import { formatBenefit } from "./formatBenefit";

function makeBenefit(overrides: Partial<StoreBenefit> = {}): StoreBenefit {
	return {
		id: "1",
		adminId: 1,
		adminName: "IT대 학생회",
		content: "음료 제공",
		goods: [],
		type: "INDIVIDUAL",
		...overrides,
	};
}

describe("formatBenefit — hasCondition", () => {
	it("people과 cost 모두 없으면 hasCondition이 false다", () => {
		const { hasCondition } = formatBenefit(makeBenefit());
		expect(hasCondition).toBe(false);
	});

	it("people만 있으면 hasCondition이 true다", () => {
		const { hasCondition } = formatBenefit(makeBenefit({ people: 4 }));
		expect(hasCondition).toBe(true);
	});

	it("cost만 있으면 hasCondition이 true다", () => {
		const { hasCondition } = formatBenefit(makeBenefit({ cost: 5000 }));
		expect(hasCondition).toBe(true);
	});
});

describe("formatBenefit — conditionText", () => {
	it("조건이 없으면 빈 문자열이다", () => {
		const { conditionText } = formatBenefit(makeBenefit());
		expect(conditionText).toBe("");
	});

	it("people만 있으면 'N명 이상 이용 시'를 반환한다", () => {
		const { conditionText } = formatBenefit(makeBenefit({ people: 4 }));
		expect(conditionText).toBe("4명 이상 이용 시");
	});

	it("cost만 있으면 'N원 이상 시'를 반환한다", () => {
		const { conditionText } = formatBenefit(makeBenefit({ cost: 5000 }));
		expect(conditionText).toBe(`${(5000).toLocaleString()}원 이상 시`);
	});

	it("people과 cost 모두 있으면 쉼표로 구분해 반환한다", () => {
		const { conditionText } = formatBenefit(
			makeBenefit({ people: 4, cost: 5000 }),
		);
		expect(conditionText).toBe(
			`4명 이상 이용 시, ${(5000).toLocaleString()}원 이상 시`,
		);
	});
});

describe("formatBenefit — goodsText", () => {
	it("goods가 없으면 빈 문자열이다", () => {
		const { goodsText } = formatBenefit(makeBenefit({ goods: [] }));
		expect(goodsText).toBe("");
	});

	it("goods가 하나면 그대로 반환한다", () => {
		const { goodsText } = formatBenefit(makeBenefit({ goods: ["음료"] }));
		expect(goodsText).toBe("음료");
	});

	it("goods가 여러 개면 쉼표로 구분해 반환한다", () => {
		const { goodsText } = formatBenefit(
			makeBenefit({ goods: ["음료", "디저트"] }),
		);
		expect(goodsText).toBe("음료, 디저트");
	});
});
