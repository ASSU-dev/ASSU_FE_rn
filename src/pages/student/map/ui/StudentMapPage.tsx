import { router } from "expo-router";
import { View } from "react-native";

import { MapSearchBar, MapView } from "@/widgets/map";

export function StudentMapPage() {
	return (
		<View className="flex-1 bg-canvas">
			<MapView />
			<MapSearchBar
				onPress={() => router.push("/(protected)/student/map-search")}
			/>
		</View>
	);
}
