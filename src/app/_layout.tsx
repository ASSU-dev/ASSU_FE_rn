import "@/shared/api";
import { useForegroundMessage, useInitFcm } from "@/features/device-token";
import { parseGroupCertificationQr } from "@/features/partnership-auth";
import { getHomeRouteByRole, initAuth } from "@/shared/api/auth";
import { initMocks } from "@/shared/api/mocks";
import { useLoadFonts } from "@/shared/lib/hooks/useLoadFonts";
import { useStompLifecycle } from "@/shared/lib/stomp/useStompLifecycle";
import "@/shared/styles/global.styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Linking } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";

initMocks();

// 비로그인 상태의 진입 화면
const REGISTER_ROUTE = "/(auth)/register";

function getLoginRouteWithReturnTo(returnTo: string) {
	return `${REGISTER_ROUTE}?returnTo=${encodeURIComponent(returnTo)}`;
}

function getVerifyRoute(url: string | null): string | null {
	if (!url) return null;
	try {
		const parsed = new URL(url);
		const isVerify =
			parsed.pathname === "/verify" || parsed.hostname === "verify";
		if (!isVerify) return null;

		if (parsed.searchParams.has("storeId")) {
			const storeId = Number(parsed.searchParams.get("storeId"));
			return Number.isSafeInteger(storeId) && storeId > 0
				? `/verify?storeId=${storeId}`
				: null;
		}

		const groupCertification = parseGroupCertificationQr(url);
		if (!groupCertification) return null;

		return `/verify?sessionId=${groupCertification.sessionId}&adminId=${groupCertification.adminId}`;
	} catch {
		return null;
	}
}

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
		const init = async () => {
			const [{ isLoggedIn, role }, url] = await Promise.all([
				initAuth(),
				Linking.getInitialURL(),
			]);

			const verifyRoute = getVerifyRoute(url);
			if (verifyRoute) {
				setInitialRoute(
					!isLoggedIn
						? getLoginRouteWithReturnTo(verifyRoute)
						: role === "ADMIN" || role === "PARTNER"
							? getHomeRouteByRole(role)
							: verifyRoute,
				);
				setAuthReady(true);
				return;
			}

			setInitialRoute(isLoggedIn ? getHomeRouteByRole(role) : REGISTER_ROUTE);
			setAuthReady(true);
		};
		void init();
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
							<Stack.Screen name="verify" options={{ headerShown: false }} />
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
