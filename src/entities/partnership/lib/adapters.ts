import type { UsageDetailDto } from "../model/api-types";
import type { Benefit } from "../model/types";

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
