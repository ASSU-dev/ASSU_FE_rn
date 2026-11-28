import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";
import { findStoreListById, STORE_LIST } from "@/entities/store";
import { StudentStoreDetailPage } from "@/pages/student/store-detail/ui/StudentStoreDetailPage";

export default function StudentStoreDetailScreen() {
	const { storeId, storeName, fromDeepLink, source } = useLocalSearchParams<{
		storeId: string;
		storeName?: string;
		fromDeepLink?: string;
		/** 유입 목록 id (STORE_LIST). GA view_item의 유입 경로로 기록한다. */
		source?: string;
	}>();
	const parsedStoreId = Number(storeId);
	const validStoreId =
		Number.isSafeInteger(parsedStoreId) && parsedStoreId > 0
			? parsedStoreId
			: 0;
	const isDeepLinkEntry = fromDeepLink === "true";
	const entryList = isDeepLinkEntry
		? STORE_LIST.deepLink
		: (findStoreListById(source) ?? STORE_LIST.direct);

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
			entryList={entryList}
			onBack={isDeepLinkEntry ? handleDeepLinkBack : undefined}
		/>
	);
}
