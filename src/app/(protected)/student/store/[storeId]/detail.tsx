import { useLocalSearchParams } from "expo-router";
import { StudentStoreDetailPage } from "@/pages/student/store-detail/ui/StudentStoreDetailPage";

export default function StudentStoreDetailScreen() {
	const { storeId, storeName } = useLocalSearchParams<{
		storeId: string;
		storeName?: string;
	}>();
	const parsedStoreId = Number(storeId);
	const validStoreId =
		Number.isSafeInteger(parsedStoreId) && parsedStoreId > 0
			? parsedStoreId
			: 0;

	return (
		<StudentStoreDetailPage storeId={validStoreId} storeName={storeName} />
	);
}
