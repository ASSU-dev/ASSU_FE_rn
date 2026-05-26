import type { SearchResultStore } from "@/entities/store";

import { AdminStoreCard } from "./AdminStoreCard";
import { StudentStoreCard } from "./StudentStoreCard";

type Role = "student" | "admin" | "partner";

interface SearchResultCardProps {
	store: SearchResultStore;
	role: Role;
	onPress?: () => void;
	onActionPress?: () => void;
}

export function SearchResultCard({
	store,
	role,
	onPress,
	onActionPress,
}: SearchResultCardProps) {
	if (role === "student") {
		return <StudentStoreCard store={store} onPress={onPress} />;
	}
	return <AdminStoreCard store={store} onActionPress={onActionPress} />;
}
