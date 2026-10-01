import { act, renderHook } from "@testing-library/react-native";

import { useStoreDetailData } from "./useStoreDetailData";

jest.mock("@/entities/store", () => ({
	useStorePapers: () => ({ data: undefined, isLoading: false }),
}));

jest.mock("@/features/store-detail/api/useGetStoreDetailsQuery", () => ({
	useGetStoreDetailsQuery: () => ({
		data: undefined,
		isLoading: false,
		isError: false,
	}),
}));

describe("useStoreDetailData — 제휴 혜택 토글", () => {
	it("혜택을 선택하면 selectedBenefitId가 업데이트된다", async () => {
		const { result } = await renderHook(() =>
			useStoreDetailData({ storeId: 1 }),
		);

		await act(() => {
			result.current.toggleBenefit("benefit-1");
		});

		expect(result.current.selectedBenefitId).toBe("benefit-1");
	});

	it("같은 혜택을 다시 누르면 선택이 해제된다", async () => {
		const { result } = await renderHook(() =>
			useStoreDetailData({ storeId: 1 }),
		);

		await act(() => {
			result.current.toggleBenefit("benefit-1");
		});
		await act(() => {
			result.current.toggleBenefit("benefit-1");
		});

		expect(result.current.selectedBenefitId).toBeNull();
	});

	it("다른 혜택을 선택하면 하나만 선택된 상태로 교체된다", async () => {
		const { result } = await renderHook(() =>
			useStoreDetailData({ storeId: 1 }),
		);

		await act(() => {
			result.current.toggleBenefit("benefit-1");
		});
		await act(() => {
			result.current.toggleBenefit("benefit-2");
		});

		expect(result.current.selectedBenefitId).toBe("benefit-2");
	});
});
