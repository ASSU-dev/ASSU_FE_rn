import { useEffect } from "react";

import {
	getFcmDeviceToken,
	setFcmDeviceToken,
} from "@/shared/api/token-storage";
import { useAuthStore } from "@/shared/lib/auth/authStore";
import {
	getFcmToken,
	requestNotificationPermission,
} from "@/shared/lib/fcm/fcmService";

import { useRegisterDeviceMutation } from "../api/useRegisterDeviceMutation";

// FCM 초기화 훅
export function useInitFcm() {
	const role = useAuthStore((state) => state.role);
	const { mutate: registerToken } = useRegisterDeviceMutation();

	useEffect(() => {
		if (!role) return;

		async function init() {
			const granted = await requestNotificationPermission();
			if (!granted) {
				console.warn("[FCM] 알림 권한 거부 ❌");
				return;
			}

			const token = await getFcmToken();
			if (!token) return;

			const cachedToken = await getFcmDeviceToken();
			if (token === cachedToken) return;

			registerToken(
				{ token },
				{
					onSuccess: () => setFcmDeviceToken(token),
				},
			);
		}

		init();
	}, [role, registerToken]);
}
