import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import { toPendingContract } from "../lib/adapters";
import type {
	BaseResponse,
	SuspendedPaperResponseDTO,
} from "../model/api-types";
import type { PendingContract } from "../model/types";

export const SUSPENDED_PAPERS_QUERY_KEY = ["partnership", "suspended"] as const;

async function fetchSuspendedPapers(): Promise<PendingContract[]> {
	if (__DEV__)
		console.log("[fetchSuspendedPapers] 요청:", "/partnership/suspended");
	const res = await apiInstance.get<
		BaseResponse<SuspendedPaperResponseDTO[] | null>
	>("/partnership/suspended");
	if (!res.data.isSuccess) {
		throw new Error(
			res.data.message || "대기 중인 제휴 계약서를 불러오지 못했습니다.",
		);
	}
	const contracts = (res.data.result ?? []).map(toPendingContract);
	if (__DEV__)
		console.log("[fetchSuspendedPapers] 응답:", { count: contracts.length });
	return contracts;
}

/** 로그인한 관리자의 대기 중(SUSPEND) 제휴 계약서 목록 */
export function useSuspendedPapers() {
	return useQuery({
		queryKey: SUSPENDED_PAPERS_QUERY_KEY,
		queryFn: fetchSuspendedPapers,
	});
}
