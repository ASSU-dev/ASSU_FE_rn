import { useLocalSearchParams } from "expo-router";

import { STORE_CATEGORIES } from "@/entities/store";
import { StudentStoreListPage } from "@/pages/student/home/ui/StudentStoreListPage";

export default function StudentStoreListScreen() {
	const { category: rawCategory } = useLocalSearchParams<{
		category?: string;
	}>();
	const initialCategory = STORE_CATEGORIES.find(
		(c) => c.value === rawCategory,
	)?.value;

	return <StudentStoreListPage initialCategory={initialCategory} />;
}
