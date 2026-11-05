import type { StoreMarker } from "../model/types";
import {
	countExtraBenefits,
	formatDistance,
	getPrimaryAdminName,
	getPrimaryBenefit,
	splitBenefitText,
} from "./mapDisplay";

function makeStore(overrides: Partial<StoreMarker> = {}): StoreMarker {
	return {
		id: "1",
		name: "카페 A",
		address: "",
		latitude: 37.4963,
		longitude: 126.9572,
		hasPartner: true,
		rate: 0,
		...overrides,
	};
}

describe("매장 카드 대표 혜택과 학생회", () => {
	it("첫 번째 학생회의 첫 번째 혜택을 대표 혜택과 대표 학생회로 사용한다", () => {
		// Given
		const store = makeStore({
			benefit: "매장 기본 혜택",
			partnerships: [
				{ adminName: "IT대 학생회", benefits: ["음료 1잔 무료", "10% 할인"] },
				{ adminName: "총학생회", benefits: ["디저트 제공"] },
			],
		});

		// When & Then
		expect(getPrimaryBenefit(store)).toBe("음료 1잔 무료");
		expect(getPrimaryAdminName(store)).toBe("IT대 학생회");
	});

	it("학생회별 혜택이 없으면 매장 기본 혜택을 대표 혜택으로 사용한다", () => {
		const store = makeStore({ benefit: "매장 기본 혜택" });

		expect(getPrimaryBenefit(store)).toBe("매장 기본 혜택");
		expect(getPrimaryAdminName(store)).toBeUndefined();
	});

	it("혜택 정보가 전혀 없으면 대표 혜택을 표시하지 않는다", () => {
		expect(getPrimaryBenefit(makeStore())).toBeUndefined();
	});
});

describe("매장 카드 추가 혜택 개수", () => {
	it("모든 학생회 혜택 중 대표 혜택을 제외한 개수를 센다", () => {
		const store = makeStore({
			partnerships: [
				{ adminName: "IT대 학생회", benefits: ["음료 1잔 무료", "10% 할인"] },
				{ adminName: "총학생회", benefits: ["디저트 제공"] },
			],
		});

		expect(countExtraBenefits(store)).toBe(2);
	});

	it.each([
		{
			case: "학생회 혜택 1개",
			store: makeStore({
				partnerships: [{ adminName: "총학생회", benefits: ["음료 제공"] }],
			}),
		},
		{ case: "매장 기본 혜택 1개", store: makeStore({ benefit: "음료 제공" }) },
		{ case: "혜택 없음", store: makeStore() },
	])("$case이면 추가 혜택은 0개다", ({ store }) => {
		expect(countExtraBenefits(store)).toBe(0);
	});
});

describe("혜택 문구의 조건과 강조 분리", () => {
	it("쉼표 앞은 조건, 쉼표 뒤는 강조 문구로 나눈다", () => {
		expect(splitBenefitText("4인이상 식사시, 음료제공")).toEqual({
			label: "4인이상 식사시,",
			highlight: "음료제공",
		});
	});

	it("쉼표가 없으면 전체를 강조 문구로 표시한다", () => {
		expect(splitBenefitText("10% 할인")).toEqual({ highlight: "10% 할인" });
	});

	it.each([
		{ benefit: undefined },
		{ benefit: "" },
	])("혜택 문구가 없으면($benefit) 아무것도 표시하지 않는다", ({ benefit }) => {
		expect(splitBenefitText(benefit)).toEqual({});
	});
});

describe("매장까지 거리 표기", () => {
	it.each([
		{ km: 0.35, expected: "350m" },
		{ km: 0.9994, expected: "999m" },
		{ km: 1, expected: "1.0km" },
		{ km: 1.24, expected: "1.2km" },
	])("$km km는 $expected로 표기한다", ({ km, expected }) => {
		expect(formatDistance(km)).toBe(expected);
	});
});
