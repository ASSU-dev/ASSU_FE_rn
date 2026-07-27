import { router } from "expo-router";
import type { SearchResultStore } from "@/entities/store";
import { MapSearchPage } from "@/pages/map-search";

function handleStorePress(store: SearchResultStore) {
	if (!store.storeId) return;

	router.push({
		pathname: "/(protected)/student/store/[storeId]",
		params: {
			storeId: store.storeId,
			storeName: store.name,
		},
	});
}

export default function StudentMapSearchScreen() {
	return <MapSearchPage userRole="student" onStorePress={handleStorePress} />;
}
