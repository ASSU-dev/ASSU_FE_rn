import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";
import { StudentStoreDetailPage } from "@/pages/student/store-detail/ui/StudentStoreDetailPage";

export default function StudentStoreDetailScreen() {
	const { storeId, storeName, fromDeepLink } = useLocalSearchParams<{
		storeId: string;
		storeName?: string;
		fromDeepLink?: string;
	}>();
	const parsedStoreId = Number(storeId);
	const validStoreId =
		Number.isSafeInteger(parsedStoreId) && parsedStoreId > 0
			? parsedStoreId
			: 0;
	const isDeepLinkEntry = fromDeepLink === "true";

	const handleDeepLinkBack = useCallback(() => {
		router.replace("/(protected)/student/(tabs)/home");
	}, []);

	useFocusEffect(
		useCallback(() => {
			if (!isDeepLinkEntry) return;

			const subscription = BackHandler.addEventListener(
				"hardwareBackPress",
				() => {
					handleDeepLinkBack();
					return true;
				},
			);

			return () => subscription.remove();
		}, [handleDeepLinkBack, isDeepLinkEntry]),
	);

	return (
		<StudentStoreDetailPage
			storeId={validStoreId}
			storeName={storeName}
			onBack={isDeepLinkEntry ? handleDeepLinkBack : undefined}
		/>
	);
}
