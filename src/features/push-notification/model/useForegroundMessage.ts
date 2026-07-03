import { getMessaging, onMessage } from "@react-native-firebase/messaging";
import { useEffect } from "react";

export function useForegroundMessage() {
	useEffect(() => {
		const unsubscribe = onMessage(getMessaging(), async (remoteMessage) => {
			console.log(
				"[FCM] 포그라운드 메시지 수신:",
				JSON.stringify(remoteMessage, null, 2),
			);
		});
		return unsubscribe;
	}, []);
}
