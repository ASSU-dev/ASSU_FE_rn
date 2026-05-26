import { router } from "expo-router";
import { View } from "react-native";

import { MapSearchBar, MapView } from "@/widgets/map";

export function AdminMapPage() {
	return (
		<View className="flex-1 bg-canvas">
			<MapView />
			<MapSearchBar
				onPress={() => router.push("/(protected)/admin/map-search")}
			/>
		</View>
	);
}
