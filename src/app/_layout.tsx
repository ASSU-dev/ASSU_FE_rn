import "@/shared/api";
import { getHomeRouteByRole, initAuth } from "@/shared/api/auth";
import { initMocks } from "@/shared/api/mocks";
import { useLoadFonts } from "@/shared/lib/hooks/useLoadFonts";
import "@/shared/styles/global.styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";

initMocks();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 1, staleTime: 1000 * 60 },
		mutations: { retry: 0 },
	},
});

export default function RootLayout() {
	const fontsLoaded = useLoadFonts();
	const [authReady, setAuthReady] = useState(false);
	const [initialRoute, setInitialRoute] = useState<string | null>(null);
	const hasRedirected = useRef(false);

	useEffect(() => {
		initAuth().then(({ isLoggedIn, role }) => {
			if (isLoggedIn) {
				setInitialRoute(getHomeRouteByRole(role));
			}
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
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(protected)" options={{ headerShown: false }} />
				</Stack>
				<StatusBar style="auto" />
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
