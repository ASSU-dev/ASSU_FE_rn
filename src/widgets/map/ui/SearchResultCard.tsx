import type { SearchResultStore } from "@/entities/store";

import { AdminStoreCard } from "./AdminStoreCard";
import { StudentStoreCard } from "./StudentStoreCard";

type Role = "student" | "admin" | "partner";

interface SearchResultCardProps {
	store: SearchResultStore;
	role: Role;
	/** 학생 카드 "외 N가지 제휴" 대체 값 */
	fallbackExtraBenefitCount?: number;
	onPress?: () => void;
	onActionPress?: () => void;
}

export function SearchResultCard({
	store,
	role,
	fallbackExtraBenefitCount,
	onPress,
	onActionPress,
}: SearchResultCardProps) {
	if (role === "student") {
		return (
			<StudentStoreCard
				store={store}
				fallbackExtraBenefitCount={fallbackExtraBenefitCount}
				onPress={onPress}
			/>
		);
	}
	return <AdminStoreCard store={store} onActionPress={onActionPress} />;
}
