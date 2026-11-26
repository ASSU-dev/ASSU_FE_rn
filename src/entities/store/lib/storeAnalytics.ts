import {
	type AnalyticsItem,
	type AnalyticsItemList,
	logSelectItem,
	logViewItem,
} from "@/shared/lib/analytics";

// 매장이 노출·선택되는 목록(유입 경로). GA 집계 기준이므로 id는 바꾸지 않는다.
export const STORE_LIST = {
	homeCuration: { id: "home_curation", name: "홈 큐레이션" },
	homeAd: { id: "home_ad", name: "홈 추천 배너" },
	storeList: { id: "store_list", name: "매장 리스트" },
	mapList: { id: "map_list", name: "지도 하단 목록" },
	mapMarker: { id: "map_marker", name: "지도 마커 카드" },
	deepLink: { id: "deep_link", name: "딥링크" },
	direct: { id: "direct", name: "직접 진입" },
} as const satisfies Record<string, AnalyticsItemList>;

export type StoreList = (typeof STORE_LIST)[keyof typeof STORE_LIST];
export type StoreListId = StoreList["id"];

// select_item의 content_type
export const STORE_CONTENT_TYPE = "store";

const STORE_LISTS: readonly StoreList[] = Object.values(STORE_LIST);

// 상세 화면 route param(source) → 목록. 모르는 값이면 undefined.
export function findStoreListById(id: string | undefined) {
	if (!id) return undefined;
	return STORE_LISTS.find((list) => list.id === id);
}

interface StoreAnalyticsSource {
	storeId?: number | string | null;
	storeName?: string | null;
	category?: string | null;
}

interface StoreAnalyticsOptions {
	index?: number;
	/** view_item처럼 이벤트에 목록 정보가 없을 때 아이템에 유입 경로를 담는다. */
	list?: AnalyticsItemList;
}

// 매장 데이터 → GA items 원소. storeId가 없으면 null.
// 개인정보 기준에 따라 매장 식별 정보(ID·이름·카테고리)만 담는다.
export function toStoreAnalyticsItem(
	store: StoreAnalyticsSource,
	{ index, list }: StoreAnalyticsOptions = {},
): AnalyticsItem | null {
	if (store.storeId === undefined || store.storeId === null) return null;
	return {
		item_id: String(store.storeId),
		...(store.storeName ? { item_name: store.storeName } : {}),
		...(store.category ? { item_category: store.category } : {}),
		...(index !== undefined ? { index } : {}),
		...(list ? { item_list_id: list.id, item_list_name: list.name } : {}),
	};
}

// 목록에서 매장을 눌렀을 때 select_item 기록 (상세 이동 직전에 호출)
export function logStoreSelect(
	list: StoreList,
	store: StoreAnalyticsSource,
	index?: number,
) {
	const item = toStoreAnalyticsItem(store, { index });
	if (item) logSelectItem(list, item, STORE_CONTENT_TYPE);
}

// 상세 화면 진입 시 view_item 기록. 유입 경로는 아이템의 item_list_id로 남긴다.
export function logStoreView(list: StoreList, store: StoreAnalyticsSource) {
	const item = toStoreAnalyticsItem(store, { list });
	if (item) logViewItem(item);
}

// 목록 전체 → items 배열. storeId 없는 항목은 건너뛰되 index는 원래 위치를 유지한다.
export function toStoreAnalyticsItems<T>(
	stores: readonly T[],
	pick: (store: T) => StoreAnalyticsSource,
): AnalyticsItem[] {
	return stores.flatMap((store, index) => {
		const item = toStoreAnalyticsItem(pick(store), { index });
		return item ? [item] : [];
	});
}
