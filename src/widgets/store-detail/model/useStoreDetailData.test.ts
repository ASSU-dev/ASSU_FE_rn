import { act, renderHook } from "@testing-library/react-native";
import type { StoreBenefit, StorePapers } from "@/entities/store";
import { useStorePapers } from "@/entities/store";
import { useGetStoreDetailsQuery } from "@/features/store-detail/api/useGetStoreDetailsQuery";
import { useStoreDetailData } from "./useStoreDetailData";

jest.mock("@/entities/store", () => {
	const actual = jest.requireActual("@/entities/store");
	return {
		...actual,
		useStorePapers: jest.fn(),
	};
});

jest.mock("@/features/store-detail/api/useGetStoreDetailsQuery", () => ({
	useGetStoreDetailsQuery: jest.fn(),
}));

type StoreQueryShape = Partial<
	Omit<ReturnType<typeof useGetStoreDetailsQuery>, "data">
> & {
	data?: Partial<
		NonNullable<ReturnType<typeof useGetStoreDetailsQuery>["data"]>
	>;
};
type PapersQueryShape = Partial<
	Omit<ReturnType<typeof useStorePapers>, "data">
> & {
	data?: Partial<StorePapers>;
};

function mockStoreQuery(value: StoreQueryShape): void {
	jest
		.mocked(useGetStoreDetailsQuery)
		.mockReturnValue(
			value as unknown as ReturnType<typeof useGetStoreDetailsQuery>,
		);
}

function mockPapersQuery(value: PapersQueryShape): void {
	jest
		.mocked(useStorePapers)
		.mockReturnValue(value as unknown as ReturnType<typeof useStorePapers>);
}

function makeBenefit(id: string, adminName = "제휴 혜택"): StoreBenefit {
	return {
		id,
		adminId: 1,
		adminName,
		paperContent: `혜택 ${id}`,
		goods: [],
		type: "INDIVIDUAL",
	};
}

describe("useStoreDetailData 로딩 상태", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("store 쿼리와 papers 쿼리 둘 다 완료되기 전에는 로딩 상태를 유지한다", () => {
		mockStoreQuery({ isLoading: true, isError: false });
		mockPapersQuery({ isLoading: true, data: undefined });

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.isLoading).toBe(true);
	});

	it("papers 쿼리만 로딩 중이어도 로딩 상태를 유지한다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: { storeId: 1, storeName: "가게" } },
		});
		mockPapersQuery({ isLoading: true, data: undefined });

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.isLoading).toBe(true);
	});
});

describe("useStoreDetailData 에러 상태", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("store 쿼리가 실패하면 에러로 판정한다", () => {
		mockStoreQuery({ isLoading: false, isError: true, data: undefined });
		mockPapersQuery({
			isLoading: false,
			data: { partnershipContents: [] },
		});

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.isError).toBe(true);
	});

	it("store 쿼리가 성공해도 result가 비어 있으면 에러로 판정한다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: undefined },
		});
		mockPapersQuery({
			isLoading: false,
			data: { partnershipContents: [] },
		});

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.isError).toBe(true);
	});

	it("store만 성공하면 papers 결과와 무관하게 에러가 아니다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: { storeId: 1, storeName: "가게" } },
		});
		mockPapersQuery({ isLoading: false, data: undefined });

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.isError).toBe(false);
	});
});

describe("useStoreDetailData 혜택 선택", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("선택된 혜택 ID와 일치하는 혜택 객체를 반환한다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: { storeId: 1, storeName: "가게" } },
		});
		const benefits = [makeBenefit("A"), makeBenefit("B")];
		mockPapersQuery({
			isLoading: false,
			data: { partnershipContents: benefits },
		});

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.selectedBenefit).toBeNull();

		act(() => {
			result.current.setSelectedBenefitId("B");
		});

		expect(result.current.selectedBenefit?.id).toBe("B");
	});
});

describe("useStoreDetailData 가게 이름 fallback", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("가게 응답의 storeName을 우선 사용한다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: { storeId: 1, storeName: "실제 이름" } },
		});
		mockPapersQuery({
			isLoading: false,
			data: { partnershipContents: [] },
		});

		const { result } = renderHook(() =>
			useStoreDetailData({ storeId: 1, fallbackName: "임시 이름" }),
		);

		expect(result.current.title).toBe("실제 이름");
	});

	it("응답의 storeName이 없으면 fallbackName을 사용한다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: { storeId: 1 } },
		});
		mockPapersQuery({
			isLoading: false,
			data: { partnershipContents: [] },
		});

		const { result } = renderHook(() =>
			useStoreDetailData({ storeId: 1, fallbackName: "임시 이름" }),
		);

		expect(result.current.title).toBe("임시 이름");
	});

	it("storeName도 fallbackName도 없으면 빈 문자열을 반환한다", () => {
		mockStoreQuery({
			isLoading: false,
			isError: false,
			data: { result: { storeId: 1 } },
		});
		mockPapersQuery({
			isLoading: false,
			data: { partnershipContents: [] },
		});

		const { result } = renderHook(() => useStoreDetailData({ storeId: 1 }));

		expect(result.current.title).toBe("");
	});
});
