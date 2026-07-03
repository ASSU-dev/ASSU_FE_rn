import {
	AuthorizationStatus,
	getMessaging,
	getToken,
	requestPermission,
} from "@react-native-firebase/messaging";
import { Platform } from "react-native";

export async function requestNotificationPermission(): Promise<boolean> {
	const authStatus = await requestPermission(getMessaging());

	if (Platform.OS === "ios") {
		return (
			authStatus === AuthorizationStatus.AUTHORIZED ||
			authStatus === AuthorizationStatus.PROVISIONAL
		);
	}
	// Android 13+ (API 33+): requestPermission이 POST_NOTIFICATIONS 권한 요청 처리
	return authStatus === AuthorizationStatus.AUTHORIZED;
}

export async function getFcmToken(): Promise<string | null> {
	try {
		const token = await getToken(getMessaging());
		return token;
	} catch (error) {
		console.error("[FCM] 토큰 취득 ❌:", error);
		return null;
	}
}
