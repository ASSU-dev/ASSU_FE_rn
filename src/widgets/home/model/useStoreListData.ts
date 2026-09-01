import { useMemo, useState } from "react";

import type { StoreCategory } from "@/entities/store";
import { useSuggestionAdmins } from "@/entities/suggestion";
import type { AdminFilterItem } from "@/features/map-filter";
import { useGetUsablePartnershipQuery } from "@/features/store-list/api/useGetUsablePartnershipQuery";

interface UseStoreListDataParams {
	initialCategory?: StoreCategory;
}

export function useStoreListData({
	initialCategory,
}: UseStoreListDataParams = {}) {
	const [selectedCategory, setSelectedCategory] =
		useState<StoreCategory | null>(initialCategory ?? null);
	const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

	// 제휴 혜택 제안자(학생회) 목록 조회
	const { data: suggestionAdmins = [] } = useSuggestionAdmins();
	const admins = useMemo<AdminFilterItem[]>(
		() =>
			suggestionAdmins.map((item) => ({ id: item.value, name: item.label })),
		[suggestionAdmins],
	);

	// 제휴 가게 목록 조회 (카테고리 별, 학생회 별 필터 적용)
	const { data: response, isLoading } = useGetUsablePartnershipQuery({
		all: true,
		storeCategory: selectedCategory ?? undefined,
		adminId: selectedAdminId ? Number(selectedAdminId) : undefined,
	});
	const stores = response?.result ?? [];

	// 카테고리 필터 토글
	const toggleCategory = (category: StoreCategory) => {
		setSelectedCategory((prev) => (prev === category ? null : category));
	};

	const toggleAdmin = (adminId: string) => {
		setSelectedAdminId((prev) => (prev === adminId ? null : adminId));
	};

	return {
		selectedCategory,
		toggleCategory,
		selectedAdminId,
		toggleAdmin,
		admins,
		stores,
		isLoading,
	};
}
