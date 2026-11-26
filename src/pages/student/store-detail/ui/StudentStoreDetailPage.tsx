import type { StoreList } from "@/entities/store";
import { StoreDetailWidget } from "@/widgets/store-detail/ui/StoreDetailWidget";

interface StudentStoreDetailPageProps {
	storeId: number;
	storeName?: string;
	entryList?: StoreList;
	onBack?: () => void;
}

export function StudentStoreDetailPage({
	storeId,
	storeName,
	entryList,
	onBack,
}: StudentStoreDetailPageProps) {
	return (
		<StoreDetailWidget
			storeId={storeId}
			storeName={storeName}
			entryList={entryList}
			onBack={onBack}
		/>
	);
}
