import { act, renderHook } from "@testing-library/react-native";
import type { StoreMarker } from "@/entities/store";
import { useClusterStores } from "./useClusterStores";

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

const STORES = [makeStore("1"), makeStore("2"), makeStore("3")];
const FILTER_KEY = JSON.stringify([null, null]);

interface HookProps {
	stores: StoreMarker[];
	filterKey: string;
}

async function renderClusterHook(initialProps: HookProps) {
	return renderHook(
		({ stores, filterKey }: HookProps) => useClusterStores(stores, filterKey),
		{ initialProps },
	);
}

describe("useClusterStores 겹친 매장 목록 상태", () => {
	it("서로 다른 매장 2개 이상이 겹친 마커를 탭하면 묶음 목록이 열린다", async () => {
		// Given
		const { result } = await renderClusterHook({
			stores: STORES,
			filterKey: FILTER_KEY,
		});

		// When
		await act(async () => {
			result.current.openCluster(["1", "2"]);
		});

		// Then
		expect(result.current.clusterMarkerIds).toEqual(["1", "2"]);
		expect(result.current.clusterStores.map((store) => store.name)).toEqual([
			"매장 1",
			"매장 2",
		]);
	});

	it.each([
		{ case: "매장 1개", ids: ["1"] },
		{ case: "같은 매장 중복", ids: ["1", "1"] },
		{ case: "지도에 없는 매장 포함", ids: ["1", "999"] },
	])("$case이면 묶음 목록이 열리지 않는다", async ({ ids }) => {
		// Given
		const { result } = await renderClusterHook({
			stores: STORES,
			filterKey: FILTER_KEY,
		});

		// When
		await act(async () => {
			result.current.openCluster(ids);
		});

		// Then
		expect(result.current.clusterMarkerIds).toEqual([]);
	});

	it("필터가 바뀌면 열려 있던 묶음 목록이 닫힌다", async () => {
		// Given
		const { result, rerender } = await renderClusterHook({
			stores: STORES,
			filterKey: FILTER_KEY,
		});
		await act(async () => {
			result.current.openCluster(["1", "2"]);
		});

		// When
		await rerender({
			stores: STORES,
			filterKey: JSON.stringify(["CAFE", null]),
		});

		// Then
		expect(result.current.clusterMarkerIds).toEqual([]);
	});

	it("지도 데이터가 바뀌어 묶음 매장이 1개 이하로 줄면 목록이 닫힌다", async () => {
		// Given
		const { result, rerender } = await renderClusterHook({
			stores: STORES,
			filterKey: FILTER_KEY,
		});
		await act(async () => {
			result.current.openCluster(["1", "2"]);
		});

		// When
		await rerender({ stores: [makeStore("1")], filterKey: FILTER_KEY });

		// Then
		expect(result.current.clusterMarkerIds).toEqual([]);
	});

	it("목록을 닫으면 묶음 목록이 사라진다", async () => {
		// Given
		const { result } = await renderClusterHook({
			stores: STORES,
			filterKey: FILTER_KEY,
		});
		await act(async () => {
			result.current.openCluster(["1", "2", "3"]);
		});

		// When
		await act(async () => {
			result.current.closeCluster();
		});

		// Then
		expect(result.current.clusterMarkerIds).toEqual([]);
	});
});
