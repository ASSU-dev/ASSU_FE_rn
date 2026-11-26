import type {
	BenefitItemFormData,
	ManualPartnershipRequestDTO,
	PartnershipOptionRequestDTO,
	ProposalFormData,
} from "../model/types";

function toOption(item: BenefitItemFormData): PartnershipOptionRequestDTO {
	const benefitCondition = item.benefitCondition.trim();
	const caution = item.caution.trim();
	const minPeople = item.minPeople.trim();

	return {
		...(benefitCondition && { benefitCondition }),
		benefit: item.benefit.trim(),
		...(caution && { caution }),
		...(minPeople && { minPeople: Number(minPeople) }),
	};
}

/**
 * 폼 값을 수동 등록 요청 바디로 변환한다.
 * 혜택 순서는 입력한 순서 그대로 유지하고, 비어 있는 선택 입력은 필드에서 제외한다.
 */
export function toManualPartnershipRequest(
	form: ProposalFormData,
): ManualPartnershipRequestDTO {
	const { selectedPlace, startDate, endDate } = form;
	if (!selectedPlace) throw new Error("가게를 선택해주세요.");
	if (!startDate || !endDate) throw new Error("제휴 기간을 선택해주세요.");

	const storeDetailAddress = form.storeDetailAddress.trim();

	return {
		storeName: selectedPlace.name,
		selectedPlace,
		...(storeDetailAddress && { storeDetailAddress }),
		partnershipPeriodStart: startDate,
		partnershipPeriodEnd: endDate,
		options: form.benefits.map(toOption),
	};
}
