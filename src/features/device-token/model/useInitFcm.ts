import { useEffect } from "react";

import {
	getFcmToken,
	requestNotificationPermission,
} from "@/shared/lib/fcm/fcmService";

import { useRegisterDeviceMutation } from "../api/useRegisterDeviceMutation";

export function useInitFcm() {
	const { mutate: registerToken } = useRegisterDeviceMutation();

	useEffect(() => {
		async function init() {
			const granted = await requestNotificationPermission();
			if (!granted) {
				console.warn("[FCM] 알림 권한 거부 ❌");
				return;
			}

			const token = await getFcmToken();
			if (!token) return;

			console.log("[FCM] 토큰 취득 ✅:", token);
			registerToken({ token });
		}

		init();
	}, [registerToken]);
}
