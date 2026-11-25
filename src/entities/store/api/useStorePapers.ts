import { useQuery } from "@tanstack/react-query";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import { ENV } from "@/shared/config/env";
import type {
	PaperContentResponseDto,
	StoreBenefit,
	StorePapers,
	StorePapersResponseDto,
} from "../model/api";

export const storeQueryKeys = {
	all: ["stores"] as const,
	papers: (storeId: number | null) => ["stores", storeId, "papers"] as const,
};

function toStoreBenefit(
	item: PaperContentResponseDto,
	index: number,
): StoreBenefit {
	const paperContent = item.paperContent?.trim() ?? "";
	const minPeople =
		typeof item.minPeople === "number" ? item.minPeople : undefined;

	return {
		id:
			typeof item.contentId === "number"
				? String(item.contentId)
				: `${item.adminId ?? "benefit"}-${index}`,
		adminId: typeof item.adminId === "number" ? item.adminId : 0,
		adminName: item.adminName?.trim() || "제휴 혜택",
		paperContent,
		partnershipPeriod: item.partnershipPeriod?.trim() || undefined,
		benefitCondition: item.benefitCondition?.trim() || undefined,
		benefit: item.benefit?.trim() || paperContent,
		caution: item.caution?.trim() || undefined,
		minPeople,
		type: minPeople !== undefined && minPeople > 1 ? "GROUP" : "INDIVIDUAL",
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
	if (__DEV__) {
		console.log("[PartnershipDebug] store papers request", {
			baseURL: apiInstance.defaults.baseURL,
			endpoint,
			storeId,
			usingMocks: ENV.USE_MOCKS,
		});
	}
	const res =
		await apiInstance.get<BaseResponse<StorePapersResponseDto | null>>(
			endpoint,
		);
	if (__DEV__) {
		console.log("[PartnershipDebug] store papers response", {
			status: res.status,
			data: res.data,
		});
	}

	if (!res.data.isSuccess) {
		throw new Error(
			res.data.message || "가게의 제휴 혜택을 불러오지 못했습니다.",
		);
	}

	const storePapers =
		res.data.result == null
			? toStorePapers({ partnershipContents: [] }, storeId)
			: toStorePapers(res.data.result, storeId);
	if (__DEV__) {
		console.log("[PartnershipDebug] store papers mapped for display", {
			storeId,
			benefits: storePapers.partnershipContents,
		});
	}

	return storePapers;
}

export function useStorePapers(storeId: number | null) {
	return useQuery({
		queryKey: storeQueryKeys.papers(storeId),
		queryFn: () => fetchStorePapers(storeId as number),
		enabled: storeId !== null,
		staleTime: 5 * 60 * 1000,
	});
}
