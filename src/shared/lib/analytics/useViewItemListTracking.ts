import { useEffect, useRef } from "react";
import {
	type AnalyticsItem,
	type AnalyticsItemList,
	logViewItemList,
} from "./analytics";

interface UseViewItemListTrackingParams {
	list: AnalyticsItemList;
	items: AnalyticsItem[];
	/** 데이터 로딩이 끝났는지. false인 동안은 기록하지 않는다. */
	ready?: boolean;
	/** 이 값이 바뀔 때만 다시 기록한다 (예: 필터 조합). 같으면 리렌더·재조회가 있어도 1회만 기록. */
	dedupeKey?: string;
}

// 목록이 표시될 때 view_item_list를 1회 기록한다. 빈 목록은 기록하지 않는다.
export function useViewItemListTracking({
	list,
	items,
	ready = true,
	dedupeKey = "",
}: UseViewItemListTrackingParams) {
	const lastLoggedKeyRef = useRef<string | null>(null);
	const itemsRef = useRef(items);
	itemsRef.current = items;

	const hasItems = items.length > 0;
	const key = `${list.id}|${dedupeKey}`;

	useEffect(() => {
		if (!ready || !hasItems || lastLoggedKeyRef.current === key) return;
		lastLoggedKeyRef.current = key;
		logViewItemList(list, itemsRef.current);
	}, [ready, hasItems, key, list]);
}
