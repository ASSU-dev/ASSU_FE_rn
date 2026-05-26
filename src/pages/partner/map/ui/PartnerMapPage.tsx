import { router } from "expo-router";
import { View } from "react-native";

import { MapSearchBar, MapView } from "@/widgets/map";

export function PartnerMapPage() {
	return (
		<View className="flex-1 bg-canvas">
			<MapView />
			<MapSearchBar
				onPress={() => router.push("/(protected)/partner/map-search")}
			/>
		</View>
	);
}
