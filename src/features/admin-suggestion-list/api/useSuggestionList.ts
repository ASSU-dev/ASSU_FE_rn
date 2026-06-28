import { useQuery } from "@tanstack/react-query";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import { toSuggestion } from "../lib/adapters";
import type { GetSuggestionResponseDto } from "../model/api-types";
import type { Suggestion } from "../model/types";

async function fetchSuggestionList(): Promise<Suggestion[]> {
	if (__DEV__) console.log("[fetchSuggestionList] 요청:", "/suggestion/list");
	const res =
		await apiInstance.get<BaseResponse<GetSuggestionResponseDto[]>>(
			"/suggestion/list",
		);
	if (__DEV__)
		console.log("[fetchSuggestionList] 응답:", {
			count: res.data.result.length,
			items: res.data.result,
		});
	return res.data.result.map(toSuggestion);
}

export function useSuggestionList() {
	return useQuery({
		queryKey: ["suggestion", "list"],
		queryFn: fetchSuggestionList,
	});
}
