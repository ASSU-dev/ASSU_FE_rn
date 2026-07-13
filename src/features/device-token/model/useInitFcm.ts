import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useEffect } from "react";

import { useAuthStore } from "@/shared/lib/auth/authStore";
import {
	getFcmToken,
	requestNotificationPermission,
} from "@/shared/lib/fcm/fcmService";

import { useRegisterDeviceMutation } from "../api/useRegisterDeviceMutation";

const FCM_TOKEN_KEY = "fcm_device_token";

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

			const cachedToken = await getItemAsync(FCM_TOKEN_KEY);
			if (token === cachedToken) return;

			registerToken(
				{ token },
				{
					onSuccess: () => setItemAsync(FCM_TOKEN_KEY, token),
				},
			);
		}

		init();
	}, [role, registerToken]);
}
