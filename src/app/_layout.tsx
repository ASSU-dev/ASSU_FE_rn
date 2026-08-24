import "@/shared/api";
import { useForegroundMessage, useInitFcm } from "@/features/device-token";
import { getHomeRouteByRole, initAuth } from "@/shared/api/auth";
import { initMocks } from "@/shared/api/mocks";
import { useLoadFonts } from "@/shared/lib/hooks/useLoadFonts";
import { useStompLifecycle } from "@/shared/lib/stomp/useStompLifecycle";
import "@/shared/styles/global.styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";

initMocks();

// 비로그인 상태의 진입 화면
const REGISTER_ROUTE = "/(auth)/register";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 1, staleTime: 1000 * 60 },
		mutations: { retry: 0 },
	},
});

export const unstable_settings = {
	anchor: "(protected)",
};

// QueryClientProvider 안에서 실행되어야 하는 FCM 훅을 별도 컴포넌트로 분리
function FcmInitializer() {
	useInitFcm();
	useForegroundMessage();
	return null;
}

export default function RootLayout() {
	useStompLifecycle();
	const fontsLoaded = useLoadFonts();
	const [authReady, setAuthReady] = useState(false);
	const [initialRoute, setInitialRoute] = useState<string | null>(null);
	const hasRedirected = useRef(false);

	useEffect(() => {
		initAuth().then(({ isLoggedIn, role }) => {
			setInitialRoute(isLoggedIn ? getHomeRouteByRole(role) : REGISTER_ROUTE);
			setAuthReady(true);
		});
	}, []);

	// Stack이 실제로 마운트된 뒤에만 replace를 실행해야 함.
	// authReady === false일 때 return null이라 Stack이 아직 없는 상태에서
	// replace를 호출하면 expo-router가 내비게이션을 재조정하며 무한 루프에 빠짐.
	useEffect(() => {
		if (authReady && initialRoute && !hasRedirected.current) {
			hasRedirected.current = true;
			router.replace(initialRoute as never);
		}
	}, [authReady, initialRoute]);

	if (!fontsLoaded || !authReady) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaProvider>
					<KeyboardProvider>
						<FcmInitializer />
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen
								name="(protected)"
								options={{ headerShown: false }}
							/>
						</Stack>
						<StatusBar style="auto" />
					</KeyboardProvider>
				</SafeAreaProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
