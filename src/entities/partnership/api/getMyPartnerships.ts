import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import { toPartnershipBenefit } from "../lib/adapters";
import type { BaseResponse, MyPartnershipDto } from "../model/api-types";
import type { Benefit } from "../model/types";

interface MyPartnerships {
	serviceCount: number;
	details: Benefit[];
}

async function fetchMyPartnerships(
	year: number,
	month: number,
): Promise<MyPartnerships> {
	if (__DEV__) console.log(`[useMyPartnerships] 요청: ${year}년 ${month}월`);
	const res = await apiInstance.get<BaseResponse<MyPartnershipDto>>(
		`/students/partnerships/${year}/${month}`,
	);
	const { serviceCount, details } = res.data.result;
	if (__DEV__)
		console.log(`[useMyPartnerships] 응답: 총 ${serviceCount}건`, details);
	return {
		serviceCount,
		details: details.map(toPartnershipBenefit),
	};
}

export function useMyPartnerships(year: number, month: number) {
	return useQuery({
		queryKey: ["partnerships", "my", year, month],
		queryFn: () => fetchMyPartnerships(year, month),
	});
}
