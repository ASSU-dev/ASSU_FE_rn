import { useQuery } from "@tanstack/react-query";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import { toReview } from "../lib/adapters";
import type {
	CheckReviewResponseDto,
	PageableParams,
	PageResponseDto,
	StandardScoreResponseDto,
} from "../model/api-types";
import type { Review } from "../model/types";

export interface ReviewPage {
	reviews: Review[];
	totalElements: number;
	totalPages: number;
	page: number;
	size: number;
	isLast: boolean;
}

const DEFAULT_PAGEABLE = {
	page: 0,
	size: 100,
} satisfies PageableParams;

function withDefaultPageable(params?: PageableParams): PageableParams {
	return {
		...DEFAULT_PAGEABLE,
		...params,
	};
}

async function fetchReviewPage(
	endpoint: string,
	params?: PageableParams,
): Promise<ReviewPage> {
	const requestParams = withDefaultPageable(params);
	if (__DEV__) console.log("[fetchReviewPage] 요청:", endpoint, requestParams);
	const res = await apiInstance.get<
		BaseResponse<PageResponseDto<CheckReviewResponseDto> | null>
	>(endpoint, {
		params: requestParams,
	});
	const page = res.data.result;
	const rawContent = page?.content;
	const content = Array.isArray(rawContent) ? rawContent : [];
	const reviews = content.map(toReview);
	if (__DEV__)
		console.log("[fetchReviewPage] 응답:", {
			totalElements: page?.totalElements ?? reviews.length,
			numberOfElements: page?.numberOfElements ?? reviews.length,
		});

	return {
		reviews,
		totalElements: page?.totalElements ?? reviews.length,
		totalPages: page?.totalPages ?? 0,
		page: page?.number ?? requestParams.page ?? DEFAULT_PAGEABLE.page,
		size: page?.size ?? requestParams.size ?? DEFAULT_PAGEABLE.size,
		isLast: page?.last ?? true,
	};
}

async function fetchPartnerReviewAverage(): Promise<number> {
	if (__DEV__)
		console.log("[fetchPartnerReviewAverage] 요청:", "/reviews/average");
	const res =
		await apiInstance.get<BaseResponse<StandardScoreResponseDto>>(
			"/reviews/average",
		);
	if (__DEV__)
		console.log("[fetchPartnerReviewAverage] 응답:", res.data.result);
	return res.data.result.score;
}

export function useStudentReviews(params?: PageableParams) {
	return useQuery({
		queryKey: ["reviews", "student", params],
		queryFn: () => fetchReviewPage("/reviews/student", params),
	});
}

export function usePartnerReviews(params?: PageableParams) {
	return useQuery({
		queryKey: ["reviews", "partner", params],
		queryFn: () => fetchReviewPage("/reviews/partner", params),
	});
}

export function useStoreReviews(
	storeId: number | null,
	params?: PageableParams,
) {
	return useQuery({
		queryKey: ["reviews", "store", storeId, params],
		queryFn: () => fetchReviewPage(`/reviews/store/${storeId}`, params),
		enabled: storeId !== null,
	});
}

export function usePartnerReviewAverage() {
	return useQuery({
		queryKey: ["reviews", "partner", "average"],
		queryFn: fetchPartnerReviewAverage,
	});
}
