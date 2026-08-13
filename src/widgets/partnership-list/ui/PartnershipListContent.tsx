import { Pressable, View } from "react-native";
import { type Partnership, PartnershipCard } from "@/entities/partnership";
import { EmptyState } from "@/shared/ui/empty-state";

interface PartnershipListContentProps {
	data: Partnership[];
	emptyDescription?: string;
	onPressCard?: (id: string) => void;
}

export function PartnershipListContent({
	data,
	emptyDescription = "제휴업체가 추가되면\n여기서 확인할 수 있어요!",
	onPressCard,
}: PartnershipListContentProps) {
	if (data.length === 0) {
		return (
			<EmptyState
				title="진행 중인 제휴가 없어요"
				description={emptyDescription}
			/>
		);
	}

	return (
		<View className="gap-5">
			{data.map((partnership) => (
				<Pressable
					key={partnership.id}
					onPress={() => onPressCard?.(partnership.id)}
				>
					<PartnershipCard {...partnership} variant="gray" />
				</Pressable>
			))}
		</View>
	);
}
