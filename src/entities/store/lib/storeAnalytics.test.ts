import {
	findStoreListById,
	STORE_LIST,
	toStoreAnalyticsItem,
	toStoreAnalyticsItems,
} from "./storeAnalytics";

describe("toStoreAnalyticsItem", () => {
	it("storeId를 문자열 item_id로 변환하고 값이 있는 속성만 담는다", () => {
		expect(
			toStoreAnalyticsItem({
				storeId: 12,
				storeName: "카페",
				category: "CAFE",
			}),
		).toEqual({ item_id: "12", item_name: "카페", item_category: "CAFE" });

		expect(toStoreAnalyticsItem({ storeId: 12 })).toEqual({ item_id: "12" });
	});

	it("storeId가 없으면 null을 반환한다", () => {
		expect(toStoreAnalyticsItem({ storeName: "카페" })).toBeNull();
		expect(toStoreAnalyticsItem({ storeId: null })).toBeNull();
	});

	it("index와 유입 목록을 함께 담는다", () => {
		expect(
			toStoreAnalyticsItem(
				{ storeId: 1 },
				{ index: 0, list: STORE_LIST.homeCuration },
			),
		).toEqual({
			item_id: "1",
			index: 0,
			item_list_id: "home_curation",
			item_list_name: "홈 큐레이션",
		});
	});
});

describe("toStoreAnalyticsItems", () => {
	it("storeId 없는 항목은 제외하되 원래 위치를 index로 유지한다", () => {
		const stores = [{ id: 1 }, { id: undefined }, { id: 3 }];
		expect(
			toStoreAnalyticsItems(stores, (store) => ({ storeId: store.id })),
		).toEqual([
			{ item_id: "1", index: 0 },
			{ item_id: "3", index: 2 },
		]);
	});
});

describe("findStoreListById", () => {
	it("알려진 id면 목록을, 모르는 값이면 undefined를 반환한다", () => {
		expect(findStoreListById("map_list")).toBe(STORE_LIST.mapList);
		expect(findStoreListById("unknown")).toBeUndefined();
		expect(findStoreListById(undefined)).toBeUndefined();
	});
});
