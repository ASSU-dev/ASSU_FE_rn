import { useQuery } from "@tanstack/react-query";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import type { WeeklyRankResponseDto } from "../model/api-types";
import type { WeeklyRank } from "../model/types";

async function fetchPartnerWeeklyRanking(): Promise<WeeklyRank[]> {
	if (__DEV__)
		console.log("[fetchPartnerWeeklyRanking] 요청:", "/store/ranking/weekly");
	const res = await apiInstance.get<BaseResponse<WeeklyRankResponseDto[]>>(
		"/store/ranking/weekly",
	);
	if (__DEV__)
		console.log("[fetchPartnerWeeklyRanking] 응답:", res.data.result);
	return res.data.result.map((item, index) => ({
		weekLabel: `${index + 1}주차`,
		rank: item.rank,
		usageCount: item.usageCount,
	}));
}

export function usePartnerWeeklyRanking() {
	return useQuery({
		queryKey: ["partner", "store", "ranking", "weekly"],
		queryFn: fetchPartnerWeeklyRanking,
	});
}
