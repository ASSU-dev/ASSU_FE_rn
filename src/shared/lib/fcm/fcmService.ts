import {
	AuthorizationStatus,
	getMessaging,
	getToken,
	requestPermission,
} from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

export async function requestNotificationPermission(): Promise<boolean> {
	if (Platform.OS === "ios") {
		const authStatus = await requestPermission(getMessaging());
		return (
			authStatus === AuthorizationStatus.AUTHORIZED ||
			authStatus === AuthorizationStatus.PROVISIONAL
		);
	}

	// Android API 32 이하: 권한 요청 불필요
	if (Number(Platform.Version) < 33) {
		return true;
	}

	// Android API 33+ (Android 13+)
	const result = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
	);
	return result === PermissionsAndroid.RESULTS.GRANTED;
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
