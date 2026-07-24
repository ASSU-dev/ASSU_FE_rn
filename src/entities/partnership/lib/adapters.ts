import type {
	AdminLiteDTO,
	AdminRecommendResponseDTO,
	PartnershipDetailResponseDTO,
	UsageDetailDto,
	WritePartnershipResponseDTO,
} from "../model/api-types";
import type {
	Benefit,
	BenefitItem,
	DiscountBenefitItem,
	EtcBenefitItem,
	Partnership,
	PartnershipContract,
	ServiceBenefitItem,
} from "../model/types";

export interface AdminAffiliationSummary {
	title: string;
	address: string;
	partnerUrl?: string;
	status?: "제휴중" | "제휴예정";
	dateRange?: string;
}

export interface PartnerAffiliationSummary {
	title: string;
	address: string;
}

export function toPartnership(dto: WritePartnershipResponseDTO): Partnership {
	const firstOption = dto.options[0];
	const benefitContent = firstOption?.note ?? firstOption?.category ?? "";

	return {
		id: dto.partnershipId.toString(),
		storeName: dto.storeName,
		benefitContent,
		startDate: dto.partnershipPeriodStart,
		endDate: dto.partnershipPeriodEnd,
	};
}

function toBenefitItem(
	option: PartnershipDetailResponseDTO["options"][number],
	index: number,
): BenefitItem {
	const id = `option-${index}`;

	if (option.anotherType) {
		const item: EtcBenefitItem = {
			id,
			serviceType: "기타 혜택",
			content: option.note ?? "",
		};
		return item;
	}

	if (option.optionType === "DISCOUNT") {
		const item: DiscountBenefitItem = {
			id,
			serviceType: "할인 혜택",
			criteria: option.criterionType === "PRICE" ? "금액" : "인원수",
			amount: option.cost?.toString() ?? "",
			minCount: option.people?.toString() ?? "",
			discountRate: option.discountRate?.toString() ?? "",
		};
		return item;
	}

	const item: ServiceBenefitItem = {
		id,
		serviceType: "서비스 제공",
		criteria: option.criterionType === "PRICE" ? "금액" : "인원수",
		amount: option.cost?.toString() ?? "",
		minCount: option.people?.toString() ?? "",
		categories: option.category ? [option.category] : [],
		items: option.goods.map((g) => g.goodsName),
	};
	return item;
}

export function toPartnershipContract(
	dto: PartnershipDetailResponseDTO,
): PartnershipContract {
	return {
		id: dto.partnershipId.toString(),
		companyName: "",
		proposerName: "",
		benefits: dto.options.map(toBenefitItem),
		startDate: dto.partnershipPeriodStart,
		endDate: dto.partnershipPeriodEnd,
		contractDate: dto.updatedAt.substring(0, 10),
	};
}

export function toAdminAffiliationSummary(
	dto: AdminRecommendResponseDTO,
): AdminAffiliationSummary {
	const addressParts = [dto.partnerAddress, dto.partnerDetailAddress].filter(
		Boolean,
	);
	return {
		title: dto.partnerName,
		address: addressParts.join(" "),
		partnerUrl: dto.partnerUrl,
	};
}

export function toPartnerAffiliationSummary(
	dto: AdminLiteDTO,
): PartnerAffiliationSummary {
	const addressParts = [dto.adminAddress, dto.adminDetailAddress].filter(
		Boolean,
	);
	return {
		title: dto.adminName,
		address: addressParts.join(" "),
	};
}

export function toPartnershipBenefit(dto: UsageDetailDto): Benefit {
	const [date, timePart] = dto.usedAt.split("T");
	const time = timePart?.substring(0, 5) ?? "";

	return {
		id: dto.partnershipUsageId.toString(),
		storeName: dto.storeName,
		date,
		time,
		description: dto.benefitDescription,
	};
}
