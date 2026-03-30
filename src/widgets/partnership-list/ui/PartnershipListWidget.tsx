import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { PartnershipCard, type Partnership } from "@/entities/partnership";

interface PartnershipListWidgetProps {
	partnerships: Partnership[];
	onViewAll?: () => void;
}

export const PartnershipListWidget = memo(({
	partnerships,
	onViewAll,
}: PartnershipListWidgetProps) => {
	return (
		<View className="gap-5">
			{/* Header */}
			<View className="flex-row items-center justify-between">
				<Text className="text-base font-medium text-content-primary">
					제휴업체 목록
				</Text>
				<Pressable onPress={onViewAll}>
					<Text className="text-xs font-regular text-content-secondary">
						전체보기
					</Text>
				</Pressable>
			</View>

			{/* Cards list */}
			<View className="gap-5">
				{partnerships.map((partnership) => (
					<PartnershipCard key={partnership.id} {...partnership} />
				))}
			</View>
		</View>
	);
});
