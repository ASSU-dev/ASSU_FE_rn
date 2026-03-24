import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadFonts } from "@/shared/lib/hooks/useLoadFonts";
import "@/shared/styles/global.styles.css";

const queryClient = new QueryClient();

export const unstable_settings = {
	anchor: "(protected)",
};

export default function RootLayout() {
	const fontsLoaded = useLoadFonts();

	if (!fontsLoaded) {
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
