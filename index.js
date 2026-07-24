import {
	getMessaging,
	setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";

setBackgroundMessageHandler(getMessaging(), async (remoteMessage) => {
	console.log(
		"[FCM] 백그라운드 메시지 수신:",
		JSON.stringify(remoteMessage, null, 2),
	);
});

import "expo-router/entry";
