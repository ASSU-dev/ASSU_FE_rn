import { useLocalSearchParams } from "expo-router";
import { StudentStoreReviewPage } from "@/pages/student/store";

export default function StudentStoreReviewScreen() {
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
		<StudentStoreReviewPage
			storeId={validStoreId}
			fallbackStoreName={storeName}
		/>
	);
}
