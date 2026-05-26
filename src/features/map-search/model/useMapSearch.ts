import { useQuery } from "@tanstack/react-query";

import type { PopularStore, SearchResultStore } from "@/entities/store";

const MOCK_POPULAR_STORES: PopularStore[] = [
	{ id: "1", name: "역전할머니맥주" },
	{ id: "2", name: "취향" },
	{ id: "3", name: "Bread & co" },
	{ id: "4", name: "인쌩맥주" },
	{ id: "5", name: "리얼후라이" },
	{ id: "6", name: "이자카야 젠" },
	{ id: "7", name: "상도로 3가" },
	{ id: "8", name: "인쌩맥주" },
];

const MOCK_SEARCH_STORES: SearchResultStore[] = [
	{
		id: "1",
		name: "역전할머니맥주 숭실대점",
		tag: "IT대 학생회",
		benefit: "4인이상 식사시, 음료제공",
		address: "서울 동작구 상도로 369",
		isPartner: true,
		partnershipStartDate: "2025.02.24",
		partnershipEndDate: "2025.06.15",
	},
	{
		id: "2",
		name: "취향",
		tag: "총학생회",
		benefit: "4인이상 식사시, 음료제공",
		address: "서울 동작구 사당로 36-1",
		isPartner: true,
		partnershipStartDate: "2025.03.01",
		partnershipEndDate: "2025.08.31",
	},
	{
		id: "3",
		name: "Bread & co",
		tag: "공대 학생회",
		benefit: "음료 10% 할인",
		address: "서울 동작구 상도로 312",
		isPartner: false,
	},
	{
		id: "4",
		name: "인쌩맥주",
		tag: "생활관",
		benefit: "빵 구매 시 아메리카노 제공",
		address: "서울 동작구 상도로 407",
		isPartner: true,
		partnershipStartDate: "2025.01.15",
		partnershipEndDate: "2025.07.14",
	},
	{
		id: "5",
		name: "리얼후라이",
		tag: "총학생회",
		benefit: "세트 메뉴 10% 할인",
		address: "서울 동작구 상도로 391",
		isPartner: false,
	},
	{
		id: "6",
		name: "이자카야 젠",
		tag: "IT대 학생회",
		benefit: "2인 이상 방문 시 음료 1잔 제공",
		address: "서울 동작구 사당로 34",
		isPartner: false,
	},
	{
		id: "7",
		name: "상도로 3가",
		tag: "생활관",
		benefit: "식사 후 음료 50% 할인",
		address: "서울 동작구 상도로 298",
		isPartner: true,
		partnershipStartDate: "2025.04.01",
		partnershipEndDate: "2025.09.30",
	},
	{
		id: "8",
		name: "역전 테스트",
		tag: "IT대 학생회",
		benefit: "테스트용 혜택입니다",
		address: "서울 동작구 상도로 99",
		isPartner: false,
	},
];

const fetchPopularStores = async (): Promise<PopularStore[]> => {
	// TODO: replace with actual API call
	// return apiClient.get("/stores/popular").then(res => res.data);
	return new Promise((resolve) => {
		setTimeout(() => resolve(MOCK_POPULAR_STORES), 300);
	});
};

const fetchSearchStores = async (
	query: string,
): Promise<SearchResultStore[]> => {
	// TODO: replace with actual API call
	// return apiClient.get("/stores/search", { params: { q: query } }).then(res => res.data);
	return new Promise((resolve) => {
		setTimeout(() => {
			const results = MOCK_SEARCH_STORES.filter((store) =>
				store.name.toLowerCase().includes(query.toLowerCase()),
			);
			resolve(results);
		}, 300);
	});
};

export function usePopularStores() {
	return useQuery<PopularStore[]>({
		queryKey: ["popularStores"],
		queryFn: fetchPopularStores,
		staleTime: 1000 * 60 * 5,
	});
}

export function useSearchStores(query: string) {
	return useQuery<SearchResultStore[]>({
		queryKey: ["storeSearch", query],
		queryFn: () => fetchSearchStores(query),
		enabled: query.trim().length > 0,
		staleTime: 1000 * 60,
	});
}
