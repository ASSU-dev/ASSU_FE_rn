import { router } from "expo-router";
import { View } from "react-native";

import { MapSearchBar, MapView } from "@/widgets/map";

export function StudentMapPage() {
	return (
		<View className="flex-1 bg-canvas">
			<MapView
				partnershipMode
				onStorePress={(store) =>
					router.push({
						pathname: "/(protected)/student/store/[storeId]",
						params: { storeId: store.id, storeName: store.name },
					})
				}
			/>
			<MapSearchBar
				onPress={() => router.push("/(protected)/student/map-search")}
			/>
		</View>
	);
}
