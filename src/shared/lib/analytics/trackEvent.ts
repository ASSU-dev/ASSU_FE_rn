import { type AnalyticsParams, logEvent } from "./analytics";
import type { AnalyticsEventMap } from "./events";

// 화면·기능 코드는 이 함수로 이벤트를 보낸다. 이벤트명과 파라미터는 events.ts의 타입으로 강제하고,
// 값이 없는(undefined) 파라미터는 GA에 보내지 않도록 키째 제외한다.
export function trackEvent<K extends keyof AnalyticsEventMap>(
	name: K,
	params: AnalyticsEventMap[K],
) {
	const compacted: AnalyticsParams = {};
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) compacted[key] = value;
	}
	logEvent(name, compacted);
}
