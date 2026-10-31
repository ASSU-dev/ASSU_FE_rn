import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import type React from "react";
import type { StoreMarker } from "@/entities/store";
import type { MapViewport, NearbyStoresFilter } from "../model/types";
import { fetchNearbyStores } from "./mapSearchApi";
import { useNearbyStores } from "./useMapSearch";

jest.mock("./mapSearchApi", () => ({
	fetchNearbyStores: jest.fn(),
	fetchPopularStores: jest.fn(),
	fetchSearchStoreLocation: jest.fn(),
	fetchSearchStores: jest.fn(),
}));

const VIEWPORT_A: MapViewport = {
	lng1: 126.9472,
	lat1: 37.5063,
	lng2: 126.9672,
	lat2: 37.5063,
	lng3: 126.9672,
	lat3: 37.4863,
	lng4: 126.9472,
	lat4: 37.4863,
};
const VIEWPORT_B: MapViewport = {
	...VIEWPORT_A,
	lng1: 126.9572,
	lng2: 126.9772,
	lng3: 126.9772,
	lng4: 126.9572,
};

function makeStore(id: string): StoreMarker {
	return {
		id,
		name: `매장 ${id}`,
		address: "",
		latitude: 37.4963,
		longitude: 126.9572,
		hasPartner: true,
		rate: 0,
	};
}

let queryClient: QueryClient;

function createWrapper() {
	queryClient = new QueryClient({
		// gcTime 기본값(5분)은 캐시 정리 타이머를 남겨 Jest worker 종료를 막는다.
		defaultOptions: {
			queries: { retry: false, gcTime: Number.POSITIVE_INFINITY },
		},
	});
	return function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
	};
}

/** 응답 시점을 테스트에서 제어하기 위한 대기 중 요청 */
function mockPendingNearbyRequest(): void {
	jest
		.mocked(fetchNearbyStores)
		.mockImplementationOnce(() => new Promise<StoreMarker[]>(() => {}));
}

interface HookProps {
	viewport: MapViewport | null;
	filter?: NearbyStoresFilter;
}

async function renderNearbyHook(initialProps: HookProps) {
	return renderHook(
		({ viewport, filter }: HookProps) => useNearbyStores(viewport, filter),
		{ initialProps, wrapper: createWrapper() },
	);
}

describe("useNearbyStores 주변 매장 조회 조건", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		queryClient?.clear();
	});

	it("지도 범위를 아직 모르면 주변 매장을 요청하지 않는다", async () => {
		const { result } = await renderNearbyHook({ viewport: null });

		expect(fetchNearbyStores).not.toHaveBeenCalled();
		expect(result.current.data).toBeUndefined();
	});

	it("지도 범위가 정해지면 범위와 필터로 주변 매장을 불러온다", async () => {
		// Given
		jest.mocked(fetchNearbyStores).mockResolvedValueOnce([makeStore("1")]);
		const filter: NearbyStoresFilter = { storeCategory: "CAFE" };

		// When
		const { result } = await renderNearbyHook({ viewport: VIEWPORT_A, filter });

		// Then
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(fetchNearbyStores).toHaveBeenCalledWith(VIEWPORT_A, filter);
		expect(result.current.data).toEqual([makeStore("1")]);
	});

	it("같은 필터에서 지도만 움직이면 새로 불러오는 동안 기존 마커를 유지한다", async () => {
		// Given
		jest.mocked(fetchNearbyStores).mockResolvedValueOnce([makeStore("1")]);
		const { result, rerender } = await renderNearbyHook({
			viewport: VIEWPORT_A,
		});
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		mockPendingNearbyRequest();

		// When
		await rerender({ viewport: VIEWPORT_B });

		// Then
		await waitFor(() =>
			expect(fetchNearbyStores).toHaveBeenLastCalledWith(VIEWPORT_B, undefined),
		);
		expect(result.current.data).toEqual([makeStore("1")]);
		expect(result.current.isPlaceholderData).toBe(true);
	});

	it("필터를 바꾸면 새로 불러오는 동안 이전 필터의 마커를 표시하지 않는다", async () => {
		// Given
		jest.mocked(fetchNearbyStores).mockResolvedValueOnce([makeStore("1")]);
		const { result, rerender } = await renderNearbyHook({
			viewport: VIEWPORT_A,
		});
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		mockPendingNearbyRequest();

		// When
		await rerender({ viewport: VIEWPORT_A, filter: { storeCategory: "CAFE" } });

		// Then
		await waitFor(() =>
			expect(fetchNearbyStores).toHaveBeenLastCalledWith(VIEWPORT_A, {
				storeCategory: "CAFE",
			}),
		);
		expect(result.current.data).toBeUndefined();
	});
});
