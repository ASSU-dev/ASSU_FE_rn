import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLoadFonts } from "@/shared/lib/hooks/useLoadFonts";
import "@/shared/styles/global.styles.css";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const fontsLoaded = useLoadFonts();

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
