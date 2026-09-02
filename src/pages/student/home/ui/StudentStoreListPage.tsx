import type { StoreCategory } from "@/entities/store";
import { StudentStoreListWidget } from "@/widgets/home/ui/StudentStoreListWidget";

interface StudentStoreListPageProps {
	initialCategory?: StoreCategory;
}

export function StudentStoreListPage({
	initialCategory,
}: StudentStoreListPageProps) {
	return <StudentStoreListWidget initialCategory={initialCategory} />;
}
