import "react-native-url-polyfill/auto";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "@/shared/api";
import { getHomeRouteByRole, initAuth } from "@/shared/api/auth";
import { initMocks } from "@/shared/api/mocks";
import { useLoadFonts } from "@/shared/lib/hooks/useLoadFonts";
import { useStompLifecycle } from "@/shared/lib/stomp/useStompLifecycle";
import "@/shared/styles/global.styles.css";

initMocks();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 1, staleTime: 1000 * 60 },
		mutations: { retry: 0 },
	},
});

export const unstable_settings = {
	anchor: "(protected)",
};

export default function RootLayout() {
	useStompLifecycle();
	const fontsLoaded = useLoadFonts();
	const [authReady, setAuthReady] = useState(false);

	useEffect(() => {
		initAuth().then(({ isLoggedIn, role }) => {
			setAuthReady(true);
			if (isLoggedIn) {
				router.replace(getHomeRouteByRole(role) as never);
			}
		});
	}, []);

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
