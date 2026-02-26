import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

export function useLoadFonts() {
	const [fontsLoaded] = useFonts({
		"Pretendard-ExtraLight": require("@/shared/assets/fonts/Pretendard-ExtraLight.otf"),
		"Pretendard-Light": require("@/shared/assets/fonts/Pretendard-Light.otf"),
		"Pretendard-Regular": require("@/shared/assets/fonts/Pretendard-Regular.otf"),
		"Pretendard-Medium": require("@/shared/assets/fonts/Pretendard-Medium.otf"),
		"Pretendard-SemiBold": require("@/shared/assets/fonts/Pretendard-SemiBold.otf"),
		"Pretendard-Bold": require("@/shared/assets/fonts/Pretendard-Bold.otf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return fontsLoaded;
}
