import { getMessaging, onMessage } from "@react-native-firebase/messaging";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useForegroundMessage() {
	const queryClient = useQueryClient();

	useEffect(() => {
		const messaging = getMessaging();
		const unsubscribe = onMessage(messaging, async (remoteMessage) => {
			console.log(
				"[FCM] 포그라운드 메시지 수신:",
				JSON.stringify(remoteMessage, null, 2),
			);
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		});
		return unsubscribe;
	}, [queryClient]);
}
