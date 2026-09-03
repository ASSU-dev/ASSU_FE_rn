import { StoreDetailWidget } from "@/widgets/store-detail/ui/StoreDetailWidget";

interface StudentStoreDetailPageProps {
	storeId: number;
	storeName?: string;
}

export function StudentStoreDetailPage({
	storeId,
	storeName,
}: StudentStoreDetailPageProps) {
	return <StoreDetailWidget storeId={storeId} storeName={storeName} />;
}
