import { useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";

import { useAuthStore } from "@/shared/lib/auth/authStore";

import { stompManager } from "./stompManager";

export function useStompLifecycle() {
	useEffect(() => {
		if (useAuthStore.getState().accessToken) {
			stompManager.activate();
		}

		// AuthStore 구독: accessToken 변경 시 stompManager 활성화/비활성화
		const unsubscribeAuth = useAuthStore.subscribe((state, prevState) => {
			if (!prevState.accessToken && state.accessToken) {
				stompManager.activate();
			} else if (prevState.accessToken && !state.accessToken) {
				stompManager.deactivate();
			}
		});

		// AppState 구독
		// 앱이 백그라운드로 전환되면 1분 후 stompManager 비활성화, 포그라운드로 전환되면 즉시 활성화
		let backgroundTimer: ReturnType<typeof setTimeout> | null = null;

		const handleAppStateChange = (nextState: AppStateStatus) => {
			if (nextState === "active") {
				if (backgroundTimer !== null) {
					clearTimeout(backgroundTimer);
					backgroundTimer = null;
				}
				if (useAuthStore.getState().accessToken && !stompManager.isActive) {
					stompManager.activate();
				}
			} else {
				if (backgroundTimer === null) {
					backgroundTimer = setTimeout(() => {
						backgroundTimer = null;
						stompManager.deactivate();
					}, 60_000);
				}
			}
		};

		const appStateSub = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => {
			if (backgroundTimer !== null) clearTimeout(backgroundTimer);
			appStateSub.remove();
			unsubscribeAuth();
		};
	}, []);
}
