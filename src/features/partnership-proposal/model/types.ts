import { z } from "zod";

/** 서버 제약: benefitCondition · caution 최대 255자 */
export const BENEFIT_TEXT_MAX_LENGTH = 255;

// ─── 폼 스키마 ──────────────────────────────────────────────────────────────
// 혜택 한 건은 서버의 PartnershipOptionRequestDTO와 1:1로 대응한다.
// 폼에서는 모두 문자열로 다루고, 제출 시 toManualPartnershipRequest에서 변환한다.
export const benefitItemFormSchema = z.object({
	id: z.string(),
	benefitCondition: z
		.string()
		.max(
			BENEFIT_TEXT_MAX_LENGTH,
			`혜택 조건은 ${BENEFIT_TEXT_MAX_LENGTH}자 이하로 입력해주세요`,
		),
	benefit: z.string().trim().min(1, "혜택 내용을 입력해주세요"),
	caution: z
		.string()
		.max(
			BENEFIT_TEXT_MAX_LENGTH,
			`유의사항은 ${BENEFIT_TEXT_MAX_LENGTH}자 이하로 입력해주세요`,
		),
	minPeople: z
		.string()
		.trim()
		.refine((value) => value === "" || /^[1-9]\d*$/.test(value), {
			message: "최소 인원은 1 이상의 숫자로 입력해주세요",
		}),
});

export type BenefitItemFormData = z.infer<typeof benefitItemFormSchema>;

/** 장소 검색에서 선택한 장소 — 서버의 SelectedPlacePayload와 동일 */
export const selectedPlaceSchema = z.object({
	placeId: z.string(),
	name: z.string(),
	address: z.string(),
	roadAddress: z.string(),
	latitude: z.number(),
	longitude: z.number(),
});

export type SelectedPlace = z.infer<typeof selectedPlaceSchema>;

export const contractFileSchema = z.object({
	uri: z.string(),
	name: z.string(),
	mimeType: z.string().optional(),
});

export type ContractFile = z.infer<typeof contractFileSchema>;

export const proposalSchema = z.object({
	// 반환 타입을 boolean으로 고정해 TS가 타입 술어로 추론해 null을 제거하지 않도록 한다
	selectedPlace: selectedPlaceSchema
		.nullable()
		.refine((place): boolean => place !== null, {
			message: "가게를 선택해주세요",
		}),
	storeDetailAddress: z.string(),
	benefits: z.array(benefitItemFormSchema).min(1, "혜택을 추가해주세요"),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
	contractFile: contractFileSchema.nullable(),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;

export const DEFAULT_BENEFIT_ITEM: BenefitItemFormData = {
	id: "",
	benefitCondition: "",
	benefit: "",
	caution: "",
	minPeople: "",
};

/** 다음 단계 버튼 활성화 등 즉시 판단용 — 스키마와 같은 기준 */
export function isBenefitItemValid(item: BenefitItemFormData): boolean {
	return benefitItemFormSchema.safeParse(item).success;
}

// ─── 서버 요청·응답 타입 (POST /partnership/passivity) ─────────────────────
export interface PartnershipOptionRequestDTO {
	benefitCondition?: string;
	benefit: string;
	caution?: string;
	minPeople?: number;
}

export interface ManualPartnershipRequestDTO {
	storeName: string;
	selectedPlace: SelectedPlace;
	storeDetailAddress?: string;
	partnershipPeriodStart: string;
	partnershipPeriodEnd: string;
	options: PartnershipOptionRequestDTO[];
}
