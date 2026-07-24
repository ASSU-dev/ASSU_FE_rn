import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type { SelectItem } from "@/shared/ui/select";
import { toSuggestionTargetItems } from "../lib/adapters";
import type { BaseResponse, GetSuggestionAdminsDto } from "../model/api-types";

async function fetchSuggestionAdmins(): Promise<SelectItem[]> {
	const res =
		await apiInstance.get<BaseResponse<GetSuggestionAdminsDto>>(
			"/suggestion/admin",
		);
	return toSuggestionTargetItems(res.data.result);
}

export function useSuggestionAdmins() {
	return useQuery({
		queryKey: ["suggestion", "admins"],
		queryFn: fetchSuggestionAdmins,
	});
}
