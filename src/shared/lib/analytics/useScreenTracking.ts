import { useSegments } from "expo-router";
import { useEffect, useRef } from "react";
import { logScreenView } from "./analytics";
import { toScreenName } from "./screenName";

// 화면이 바뀔 때마다 screen_view를 1회 기록한다.
// 같은 화면에서의 리렌더링은 직전 화면명과 비교해 중복 기록하지 않는다.
export function useScreenTracking() {
	const screenName = toScreenName(useSegments());
	const lastScreenName = useRef<string | null>(null);

	useEffect(() => {
		if (!screenName || lastScreenName.current === screenName) return;
		lastScreenName.current = screenName;
		logScreenView(screenName);
	}, [screenName]);
}
