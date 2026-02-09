import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

export function useLoadFonts() {
	const [fontsLoaded] = useFonts({
		"Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
		"Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
		"Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
		"Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return fontsLoaded;
}
