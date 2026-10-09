import { useCallback, useEffect, useMemo, useState } from "react";
import type { StoreMarker } from "@/entities/store";

interface ClusterSelection {
	ids: string[];
	filterKey: string;
}

/** 열린 클러스터를 관리하며 개별 매장 선택과 목록 닫기를 분리함 */
export function useClusterStores(stores: StoreMarker[], filterKey: string) {
	const [selection, setSelection] = useState<ClusterSelection | null>(null);

	const clusterStores = useMemo(() => {
		if (!selection || selection.filterKey !== filterKey) return [];
		const byId = new Map(stores.map((store) => [store.id, store]));
		return selection.ids.flatMap((id) => {
			const store = byId.get(id);
			return store ? [store] : [];
		});
	}, [filterKey, selection, stores]);

	// 필터 변경 또는 지도 데이터에서 그룹이 사라진 경우 이전 선택을 제거함
	useEffect(() => {
		if (selection && clusterStores.length < 2) setSelection(null);
	}, [clusterStores, selection]);

	const clusterMarkerIds = useMemo(
		() =>
			clusterStores.length > 1 ? clusterStores.map((store) => store.id) : [],
		[clusterStores],
	);
	const openCluster = useCallback(
		(ids: string[]) => {
			const uniqueIds = [...new Set(ids)];
			setSelection(uniqueIds.length > 1 ? { ids: uniqueIds, filterKey } : null);
		},
		[filterKey],
	);
	const closeCluster = useCallback(() => setSelection(null), []);

	return { clusterStores, clusterMarkerIds, openCluster, closeCluster };
}
