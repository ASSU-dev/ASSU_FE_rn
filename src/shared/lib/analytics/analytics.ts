import {
	logEvent as firebaseLogEvent,
	getAnalytics,
	setAnalyticsCollectionEnabled,
} from "@react-native-firebase/analytics";

export type AnalyticsParams = Record<string, string | number>;

// GA4 추천 이벤트(view_item_list·select_item·view_item)의 items 배열 원소
// Firebase Item 타입(인덱스 시그니처 보유)에 대입되도록 interface 대신 type으로 선언한다.
export type AnalyticsItem = {
	item_id: string;
	item_name?: string;
	item_category?: string;
	/** 목록 내 위치 (0부터) */
	index?: number;
	item_list_id?: string;
	item_list_name?: string;
};

// 아이템이 노출된 목록(유입 경로). id는 집계 기준이므로 영문 snake_case로 고정한다.
export interface AnalyticsItemList {
	id: string;
	name: string;
}

// GA4는 이벤트 하나에 items를 최대 200개까지 받는다.
const MAX_ITEMS_PER_EVENT = 200;

// 개발 빌드(__DEV__)는 기본적으로 수집하지 않는다. DebugView 확인이 필요할 때만
// .env에 EXPO_PUBLIC_ANALYTICS_DEBUG=true를 설정해 켠다. 프로덕션 빌드는 항상 수집한다.
export const isAnalyticsEnabled =
	!__DEV__ || process.env.EXPO_PUBLIC_ANALYTICS_DEBUG === "true";

// 네이티브 모듈이 없는 빌드(analytics 추가 이전 dev client, Jest 등)에서도
// 앱이 죽지 않도록 모든 SDK 호출을 이 함수로 감싼다.
async function runSafely(label: string, task: () => Promise<void>) {
	try {
		await task();
	} catch (error) {
		if (__DEV__) console.warn(`[Analytics] ${label} 실패:`, error);
	}
}

// 앱 시작 시 1회 호출. 수집 여부를 네이티브에 반영한다 (설정은 앱 재실행 후에도 유지됨).
export function initAnalytics() {
	void runSafely("수집 설정", () =>
		setAnalyticsCollectionEnabled(getAnalytics(), isAnalyticsEnabled),
	);
}

// 화면·기능 코드에서는 Firebase SDK 대신 이 함수만 사용한다.
// 이벤트명·속성 타입은 이벤트 명세 확정 후 좁힌다.
export function logEvent(name: string, params?: AnalyticsParams) {
	if (!isAnalyticsEnabled) return;
	if (__DEV__) console.log("[Analytics] event:", name, params ?? {});
	void runSafely(`이벤트(${name})`, () =>
		firebaseLogEvent(getAnalytics(), name, params),
	);
}

// 목록이 화면에 표시됐을 때. 중복 방지는 useViewItemListTracking에서 처리한다.
export function logViewItemList(
	list: AnalyticsItemList,
	items: AnalyticsItem[],
) {
	if (!isAnalyticsEnabled || items.length === 0) return;
	const params = {
		item_list_id: list.id,
		item_list_name: list.name,
		items: items.slice(0, MAX_ITEMS_PER_EVENT),
	};
	if (__DEV__) console.log("[Analytics] event: view_item_list", params);
	void runSafely("이벤트(view_item_list)", () =>
		firebaseLogEvent(getAnalytics(), "view_item_list", params),
	);
}

// 목록에서 아이템을 선택했을 때 (상세 이동 직전)
export function logSelectItem(
	list: AnalyticsItemList,
	item: AnalyticsItem,
	contentType: string,
) {
	if (!isAnalyticsEnabled) return;
	const params = {
		content_type: contentType,
		item_list_id: list.id,
		item_list_name: list.name,
		items: [item],
	};
	if (__DEV__) console.log("[Analytics] event: select_item", params);
	void runSafely("이벤트(select_item)", () =>
		firebaseLogEvent(getAnalytics(), "select_item", params),
	);
}

// 상세 화면에 진입했을 때. 유입 경로는 item의 item_list_id로 전달한다.
export function logViewItem(item: AnalyticsItem) {
	if (!isAnalyticsEnabled) return;
	const params = { items: [item] };
	if (__DEV__) console.log("[Analytics] event: view_item", params);
	void runSafely("이벤트(view_item)", () =>
		firebaseLogEvent(getAnalytics(), "view_item", params),
	);
}

export function logScreenView(screenName: string) {
	if (!isAnalyticsEnabled) return;
	if (__DEV__) console.log("[Analytics] screen_view:", screenName);
	void runSafely(`화면(${screenName})`, () =>
		firebaseLogEvent(getAnalytics(), "screen_view", {
			screen_name: screenName,
			screen_class: screenName,
		}),
	);
}
