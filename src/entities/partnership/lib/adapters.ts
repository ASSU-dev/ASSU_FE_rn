import type {
	AdminLiteDTO,
	AdminRecommendResponseDTO,
	PartnershipDetailResponseDTO,
	SuspendedPaperResponseDTO,
	UsageDetailDto,
	WritePartnershipResponseDTO,
} from "../model/api-types";
import type {
	BenefitItem,
	DiscountBenefitItem,
	EtcBenefitItem,
	Partnership,
	PartnershipContract,
	PendingContract,
	ReviewableBenefit,
	ServiceBenefitItem,
} from "../model/types";

export interface AdminAffiliationSummary {
	partnerId: number;
	title: string;
	address: string;
	partnerUrl?: string;
	status?: "제휴중" | "제휴예정";
	dateRange?: string;
}

export interface PartnerAffiliationSummary {
	adminId: number;
	title: string;
	address: string;
}

function toPartnership(
	dto: WritePartnershipResponseDTO,
	storeName: string,
): Partnership {
	const firstOption = dto.options[0];
	const benefitContent = firstOption?.note ?? firstOption?.category ?? "";

	return {
		id: dto.partnershipId.toString(),
		storeName,
		benefitContent,
		startDate: dto.partnershipPeriodStart,
		endDate: dto.partnershipPeriodEnd,
	};
}

export function toAdminPartnership(
	dto: WritePartnershipResponseDTO,
): Partnership {
	return toPartnership(dto, dto.storeName);
}

export function toPartnerPartnership(
	dto: WritePartnershipResponseDTO,
): Partnership {
	return toPartnership(dto, dto.adminName);
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
	dto: AdminRecommendResponseDTO | null | undefined,
): AdminAffiliationSummary | null {
	if (
		!dto ||
		!Number.isSafeInteger(dto.partnerId) ||
		dto.partnerId <= 0 ||
		typeof dto.partnerName !== "string" ||
		dto.partnerName.trim().length === 0
	) {
		return null;
	}

	const addressParts = [dto.partnerAddress, dto.partnerDetailAddress].filter(
		(part): part is string => typeof part === "string" && part.length > 0,
	);
	return {
		partnerId: dto.partnerId,
		title: dto.partnerName.trim(),
		address: addressParts.join(" "),
		partnerUrl:
			typeof dto.partnerUrl === "string" && dto.partnerUrl.length > 0
				? dto.partnerUrl
				: undefined,
	};
}

export function toPartnerAffiliationSummary(
	dto: AdminLiteDTO,
): PartnerAffiliationSummary {
	const addressParts = [dto.adminAddress, dto.adminDetailAddress].filter(
		Boolean,
	);
	return {
		adminId: dto.adminId,
		title: dto.adminName,
		address: addressParts.join(" "),
	};
}

export function toPartnershipBenefit(dto: UsageDetailDto): ReviewableBenefit {
	const [date, timePart] = dto.usedAt.split("T");
	const time = timePart?.substring(0, 5) ?? "";

	return {
		id: dto.partnershipUsageId.toString(),
		storeId: dto.storeId,
		partnerId: dto.partnerId,
		adminName: dto.adminName,
		storeName: dto.storeName,
		date,
		time,
		description: dto.benefitDescription,
		isReviewed: dto.isReviewed,
	};
}

export function toPendingContract(
	dto: SuspendedPaperResponseDTO,
): PendingContract {
	return {
		paperId: dto.paperId,
		partnerName: dto.partnerName,
		proposedAt: dto.createdAt.split("T")[0] ?? dto.createdAt,
	};
}
