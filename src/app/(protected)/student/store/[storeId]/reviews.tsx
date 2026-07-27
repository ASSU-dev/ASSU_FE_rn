import { useLocalSearchParams } from "expo-router";
import { StudentStoreReviewsPage } from "@/pages/student/store";

export default function StudentStoreReviewsScreen() {
	const { storeId, storeName } = useLocalSearchParams<{
		storeId?: string;
		storeName?: string;
	}>();
	const parsedStoreId = Number(storeId);
	const validStoreId =
		Number.isSafeInteger(parsedStoreId) && parsedStoreId > 0
			? parsedStoreId
			: null;

	return (
		<StudentStoreReviewsPage
			storeId={validStoreId}
			fallbackStoreName={storeName}
		/>
	);
}
