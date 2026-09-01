import { useQuery } from "@tanstack/react-query";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import type {
	PaperContentResponseDto,
	StoreBenefit,
	StorePapers,
	StorePapersResponseDto,
} from "../model/api-types";

export const storeQueryKeys = {
	all: ["stores"] as const,
	papers: (storeId: number | null) => ["stores", storeId, "papers"] as const,
};

function toStoreBenefit(
	item: PaperContentResponseDto,
	index: number,
): StoreBenefit {
	const goods = Array.isArray(item.goods)
		? item.goods.filter(
				(good): good is string =>
					typeof good === "string" && good.trim().length > 0,
			)
		: [];
	const paperContent = item.paperContent?.trim();

	return {
		id:
			typeof item.contentId === "number"
				? String(item.contentId)
				: `${item.adminId ?? "benefit"}-${index}`,
		adminId: typeof item.adminId === "number" ? item.adminId : 0,
		adminName: item.adminName?.trim() || "제휴 혜택",
		content: paperContent || goods.join(", ") || "혜택 정보가 없습니다.",
		goods,
		people: typeof item.people === "number" ? item.people : undefined,
		cost: typeof item.cost === "number" ? item.cost : undefined,
		type: typeof item.people === "number" ? "GROUP" : "INDIVIDUAL",
	};
}

function toStorePapers(
	response: StorePapersResponseDto,
	requestedStoreId: number,
): StorePapers {
	const rawContents = Array.isArray(response.partnershipContents)
		? response.partnershipContents
		: [];

	return {
		storeId:
			typeof response.storeId === "number"
				? response.storeId
				: requestedStoreId,
		storeName: response.storeName?.trim() || "",
		partnershipContents: rawContents.map(toStoreBenefit),
	};
}

async function fetchStorePapers(storeId: number): Promise<StorePapers> {
	const endpoint = `/store/${storeId}/papers`;
	if (__DEV__) console.log("[fetchStorePapers] 요청:", endpoint);
	const res =
		await apiInstance.get<BaseResponse<StorePapersResponseDto | null>>(
			endpoint,
		);

	if (!res.data.isSuccess || res.data.result == null) {
		throw new Error(
			res.data.message || "가게의 제휴 혜택을 불러오지 못했습니다.",
		);
	}

	return toStorePapers(res.data.result, storeId);
}

export function useStorePapers(storeId: number | null) {
	return useQuery({
		queryKey: storeQueryKeys.papers(storeId),
		queryFn: () => fetchStorePapers(storeId as number),
		enabled: storeId !== null,
		staleTime: 5 * 60 * 1000,
	});
}
