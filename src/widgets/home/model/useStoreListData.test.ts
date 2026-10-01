import { act, renderHook } from "@testing-library/react-native";

import { useStoreListData } from "./useStoreListData";

// API 훅을 가짜 모듈로 교체 — 서버 없이 상태 로직만 테스트
jest.mock("@/entities/suggestion", () => ({
	useSuggestionAdmins: () => ({ data: [] }),
}));

jest.mock("@/features/store-list/api/useGetUsablePartnershipQuery", () => ({
	useGetUsablePartnershipQuery: () => ({ data: undefined, isLoading: false }),
}));

describe("useStoreListData — 카테고리 필터", () => {
	it("카테고리를 선택하면 selectedCategory가 업데이트된다", async () => {
		const { result } = await renderHook(() => useStoreListData());

		await act(() => {
			result.current.toggleCategory("CAFE");
		});

		expect(result.current.selectedCategory).toBe("CAFE");
	});

	it("같은 카테고리를 다시 누르면 선택이 해제된다", async () => {
		const { result } = await renderHook(() => useStoreListData());

		await act(() => {
			result.current.toggleCategory("CAFE");
		});
		await act(() => {
			result.current.toggleCategory("CAFE");
		});

		expect(result.current.selectedCategory).toBeNull();
	});

	it("다른 카테고리를 선택하면 기존 선택이 교체된다", async () => {
		const { result } = await renderHook(() => useStoreListData());

		await act(() => {
			result.current.toggleCategory("CAFE");
		});
		await act(() => {
			result.current.toggleCategory("RESTAURANT");
		});

		expect(result.current.selectedCategory).toBe("RESTAURANT");
	});
});

describe("useStoreListData — 학생회 필터", () => {
	it("학생회를 선택하면 selectedAdminId가 업데이트된다", async () => {
		const { result } = await renderHook(() => useStoreListData());

		await act(() => {
			result.current.toggleAdmin("1");
		});

		expect(result.current.selectedAdminId).toBe("1");
	});

	it("같은 학생회를 다시 누르면 선택이 해제된다", async () => {
		const { result } = await renderHook(() => useStoreListData());

		await act(() => {
			result.current.toggleAdmin("1");
		});
		await act(() => {
			result.current.toggleAdmin("1");
		});

		expect(result.current.selectedAdminId).toBeNull();
	});
});
