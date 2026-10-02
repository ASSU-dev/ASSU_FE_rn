import { useCallback, useEffect, useMemo, useState } from "react";
import type { StoreMarker } from "@/entities/store";

interface ClusterSelection {
	key: string;
	ids: string[];
	filterKey: string;
}

/** 클러스터 선택과 카드별 닫기 상태 관리 */
export function useClusterStores(stores: StoreMarker[], filterKey: string) {
	const [selection, setSelection] = useState<ClusterSelection | null>(null);

	// 필터 변경 시 이전 클러스터 선택을 제거함
	useEffect(() => {
		setSelection((current) =>
			current?.filterKey === filterKey ? current : null,
		);
	}, [filterKey]);

	const clusterStores = useMemo(() => {
		if (!selection || selection.filterKey !== filterKey) return [];
		const byId = new Map(stores.map((store) => [store.id, store]));
		return selection.ids.flatMap((id) => {
			const store = byId.get(id);
			return store ? [store] : [];
		});
	}, [filterKey, selection, stores]);

	const openCluster = useCallback(
		(ids: string[]) => {
			const uniqueIds = [...new Set(ids)];
			setSelection({ key: uniqueIds.join(","), ids: uniqueIds, filterKey });
		},
		[filterKey],
	);
	const closeCluster = useCallback(() => setSelection(null), []);
	const dismissStore = useCallback((id: string) => {
		setSelection((current) => {
			if (!current) return null;
			const ids = current.ids.filter((storeId) => storeId !== id);
			return ids.length > 0 ? { ...current, ids } : null;
		});
	}, []);

	return {
		clusterStores,
		clusterKey: selection?.key ?? "",
		openCluster,
		closeCluster,
		dismissStore,
	};
}
