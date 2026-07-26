import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
	page: 1,
	size: 100,
} satisfies PageableParams;

export const reviewQueryKeys = {
	all: ["reviews"] as const,
	student: (params?: PageableParams) => ["reviews", "student", params] as const,
	partner: (params?: PageableParams) => ["reviews", "partner", params] as const,
	store: (storeId: number | null, params?: PageableParams) =>
		["reviews", "store", storeId, params] as const,
	storeInfinite: (
		storeId: number | null,
		params?: Omit<PageableParams, "page">,
	) => ["reviews", "store", storeId, "infinite", params] as const,
	partnerAverage: ["reviews", "partner", "average"] as const,
	storeAverage: (storeId: number | null) =>
		["reviews", "store", storeId, "average"] as const,
};

function withDefaultPageable(params?: PageableParams): PageableParams {
	return {
		...DEFAULT_PAGEABLE,
		...params,
	};
}

function unwrapReviewResult<T>(
	response: BaseResponse<T | null>,
	fallbackMessage: string,
): T {
	if (!response.isSuccess || response.result == null) {
		throw new Error(response.message || fallbackMessage);
	}

	return response.result;
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
	const page = unwrapReviewResult(res.data, "리뷰 목록을 불러오지 못했습니다.");
	const rawContent = page.content;
	const content = Array.isArray(rawContent) ? rawContent : [];
	const reviews = content.map(toReview);
	if (__DEV__)
		console.log("[fetchReviewPage] 응답:", {
			totalElements: page.totalElements ?? reviews.length,
			numberOfElements: page.numberOfElements ?? reviews.length,
		});

	return {
		reviews,
		totalElements: page.totalElements ?? reviews.length,
		totalPages: page.totalPages ?? 0,
		page: requestParams.page ?? DEFAULT_PAGEABLE.page,
		size: page.size ?? requestParams.size ?? DEFAULT_PAGEABLE.size,
		isLast: page.last ?? true,
	};
}

async function fetchPartnerReviewAverage(): Promise<number> {
	if (__DEV__)
		console.log("[fetchPartnerReviewAverage] 요청:", "/reviews/average");
	const res =
		await apiInstance.get<BaseResponse<StandardScoreResponseDto>>(
			"/reviews/average",
		);
	const result = unwrapReviewResult(
		res.data,
		"내 가게 리뷰 평균을 불러오지 못했습니다.",
	);
	if (__DEV__) console.log("[fetchPartnerReviewAverage] 응답:", result);
	return result.score;
}

async function fetchStoreReviewAverage(storeId: number): Promise<number> {
	const endpoint = `/reviews/average/${storeId}`;
	if (__DEV__) console.log("[fetchStoreReviewAverage] 요청:", endpoint);
	const res =
		await apiInstance.get<BaseResponse<StandardScoreResponseDto>>(endpoint);
	const result = unwrapReviewResult(
		res.data,
		"가게 리뷰 평균을 불러오지 못했습니다.",
	);
	if (__DEV__) console.log("[fetchStoreReviewAverage] 응답:", result);
	return result.score;
}

export function useStudentReviews(params?: PageableParams) {
	return useQuery({
		queryKey: reviewQueryKeys.student(params),
		queryFn: () => fetchReviewPage("/reviews/student", params),
	});
}

export function usePartnerReviews(params?: PageableParams) {
	return useQuery({
		queryKey: reviewQueryKeys.partner(params),
		queryFn: () => fetchReviewPage("/reviews/partner", params),
	});
}

export function useStoreReviews(
	storeId: number | null,
	params?: PageableParams,
) {
	return useQuery({
		queryKey: reviewQueryKeys.store(storeId, params),
		queryFn: () => fetchReviewPage(`/reviews/store/${storeId}`, params),
		enabled: storeId !== null,
	});
}

export function useInfiniteStoreReviews(
	storeId: number | null,
	params?: Omit<PageableParams, "page">,
) {
	return useInfiniteQuery({
		queryKey: reviewQueryKeys.storeInfinite(storeId, params),
		queryFn: ({ pageParam }) =>
			fetchReviewPage(`/reviews/store/${storeId}`, {
				...params,
				page: pageParam,
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.isLast ? undefined : lastPage.page + 1,
		enabled: storeId !== null,
	});
}

export function usePartnerReviewAverage() {
	return useQuery({
		queryKey: reviewQueryKeys.partnerAverage,
		queryFn: fetchPartnerReviewAverage,
	});
}

export function useStoreReviewAverage(storeId: number | null) {
	return useQuery({
		queryKey: reviewQueryKeys.storeAverage(storeId),
		queryFn: () => fetchStoreReviewAverage(storeId as number),
		enabled: storeId !== null,
	});
}
