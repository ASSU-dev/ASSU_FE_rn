import {
	BENEFIT_TEXT_MAX_LENGTH,
	type BenefitItemFormData,
	DEFAULT_BENEFIT_ITEM,
	isBenefitItemValid,
	proposalSchema,
} from "./types";

const validBenefit: BenefitItemFormData = {
	...DEFAULT_BENEFIT_ITEM,
	id: "1",
	benefit: "음료 1캔 제공",
};

const place = {
	placeId: "p-1",
	name: "숭실카페",
	address: "서울 동작구 상도동 1",
	roadAddress: "서울 동작구 상도로 1",
	latitude: 37.49,
	longitude: 126.95,
};

describe("혜택 입력 검증", () => {
	it("혜택 내용만 있으면 유효하다", () => {
		expect(isBenefitItemValid(validBenefit)).toBe(true);
	});

	it.each(["", "   "])("혜택 내용이 %j이면 유효하지 않다", (benefit) => {
		expect(isBenefitItemValid({ ...validBenefit, benefit })).toBe(false);
	});

	it("혜택 조건과 유의사항이 255자를 넘으면 유효하지 않다", () => {
		const tooLong = "가".repeat(BENEFIT_TEXT_MAX_LENGTH + 1);
		const exact = "가".repeat(BENEFIT_TEXT_MAX_LENGTH);

		expect(
			isBenefitItemValid({ ...validBenefit, benefitCondition: exact }),
		).toBe(true);
		expect(
			isBenefitItemValid({ ...validBenefit, benefitCondition: tooLong }),
		).toBe(false);
		expect(isBenefitItemValid({ ...validBenefit, caution: tooLong })).toBe(
			false,
		);
	});

	it.each([
		{ minPeople: "", valid: true },
		{ minPeople: "1", valid: true },
		{ minPeople: "4", valid: true },
		{ minPeople: "0", valid: false },
		{ minPeople: "-2", valid: false },
		{ minPeople: "1.5", valid: false },
		{ minPeople: "abc", valid: false },
	])("최소 인원 %j의 유효성은 $valid이다", ({ minPeople, valid }) => {
		expect(isBenefitItemValid({ ...validBenefit, minPeople })).toBe(valid);
	});
});

describe("수동 등록 폼 스키마", () => {
	const validForm = {
		selectedPlace: place,
		storeDetailAddress: "",
		benefits: [validBenefit],
		startDate: "2026-12-01",
		endDate: "2026-12-31",
		contractFile: { uri: "file:///contract.jpg", name: "contract.jpg" },
	};

	it("가게, 혜택, 기간, 계약서가 있으면 통과한다", () => {
		expect(proposalSchema.safeParse(validForm).success).toBe(true);
	});

	it("가게를 선택하지 않으면 실패한다", () => {
		const result = proposalSchema.safeParse({
			...validForm,
			selectedPlace: null,
		});

		expect(result.success).toBe(false);
	});

	it("혜택이 하나도 없으면 실패한다", () => {
		const result = proposalSchema.safeParse({ ...validForm, benefits: [] });

		expect(result.success).toBe(false);
	});
});
