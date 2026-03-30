import { View } from "react-native";
import { Partnership, PartnershipCard } from "@/entities/partnership";
import { EmptyState } from "@/shared/ui/empty-state";

interface PartnershipListContentProps {
	data: Partnership[];
}

export function PartnershipListContent({ data }: PartnershipListContentProps) {
	if (data.length === 0) {
		return (
			<EmptyState
				title="진행 중인 제휴가 없어요"
				description={`제휴업체가 추가되면\n여기서 확인할 수 있어요!`}
			/>
		);
	}

	return (
		<View className="gap-5">
			{data.map((partnership) => (
				<PartnershipCard key={partnership.id} {...partnership} variant="gray" />
			))}
		</View>
	);
}
