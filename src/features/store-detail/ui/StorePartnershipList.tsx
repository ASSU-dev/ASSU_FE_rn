import { Text, View } from "react-native";
import type { StoreBenefit } from "@/entities/store";
import { PartnershipSelectItem } from "./PartnershipSelectItem";

interface StorePartnershipListProps {
	benefits: StoreBenefit[];
	selectedId: string | null;
	onSelect: (id: string | null) => void;
}

export function StorePartnershipList({
	benefits,
	selectedId,
	onSelect,
}: StorePartnershipListProps) {
	if (benefits.length === 0) {
		return (
			<View className="items-center py-8">
				<Text className="font-regular text-sm text-content-tertiary">
					사용 가능한 제휴 혜택이 없습니다
				</Text>
			</View>
		);
	}

	return (
		<View className="gap-3">
			{benefits.map((benefit, index) => (
				<PartnershipSelectItem
					key={`${benefit.id}-${index}`}
					benefit={benefit}
					isSelected={selectedId === benefit.id}
					onPress={() =>
						onSelect(selectedId === benefit.id ? null : benefit.id)
					}
				/>
			))}
		</View>
	);
}
