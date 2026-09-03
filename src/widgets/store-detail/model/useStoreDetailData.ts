import { useState } from "react";

import { useStorePapers } from "@/entities/store";
import { useGetStoreDetailsQuery } from "@/features/store-detail/api/useGetStoreDetailsQuery";

interface UseStoreDetailDataParams {
	storeId: number;
	fallbackName?: string;
}

export function useStoreDetailData({
	storeId,
	fallbackName,
}: UseStoreDetailDataParams) {
	const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(
		null,
	);

	// 가게 상세 정보 조회
	const {
		data: storeResponse,
		isLoading: isStoreLoading,
		isError: isStoreError,
	} = useGetStoreDetailsQuery(storeId);
	const store = storeResponse?.result;

	// 해당 가게의 제휴 혜택 조회
	const { data: papers, isLoading: isPapersLoading } = useStorePapers(storeId);
	const benefits = papers?.partnershipContents ?? [];

	const selectedBenefit =
		benefits.find((b) => b.id === selectedBenefitId) ?? null;

	const title = store?.storeName ?? fallbackName ?? "";
	const address = [store?.address, store?.detailAddress]
		.filter(Boolean)
		.join(" ");
	const images = store?.profileUrl ? [store.profileUrl] : [];

	const isLoading = isStoreLoading || isPapersLoading;
	const isError = isStoreError || !store;

	return {
		store,
		benefits,
		selectedBenefitId,
		setSelectedBenefitId,
		selectedBenefit,
		title,
		address,
		images,
		isLoading,
		isError,
	};
}
