import {
	logEvent as firebaseLogEvent,
	logScreenView as firebaseLogScreenView,
	getAnalytics,
	setAnalyticsCollectionEnabled,
} from "@react-native-firebase/analytics";

export type AnalyticsParams = Record<string, string | number>;

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

export function logScreenView(screenName: string) {
	if (!isAnalyticsEnabled) return;
	if (__DEV__) console.log("[Analytics] screen_view:", screenName);
	void runSafely(`화면(${screenName})`, () =>
		firebaseLogScreenView(getAnalytics(), {
			screen_name: screenName,
			screen_class: screenName,
		}),
	);
}
