import { StoreDetailWidget } from "@/widgets/store-detail/ui/StoreDetailWidget";

interface StudentStoreDetailPageProps {
	storeId: number;
	storeName?: string;
	onBack?: () => void;
}

export function StudentStoreDetailPage({
	storeId,
	storeName,
	onBack,
}: StudentStoreDetailPageProps) {
	return (
		<StoreDetailWidget
			storeId={storeId}
			storeName={storeName}
			onBack={onBack}
		/>
	);
}
