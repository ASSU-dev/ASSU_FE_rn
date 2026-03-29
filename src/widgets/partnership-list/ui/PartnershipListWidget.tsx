import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { PartnershipCard, type Partnership } from "@/entities/partnership";

interface PartnershipListWidgetProps {
	partnerships: Partnership[];
	title?: string;
	variant?: "white" | "gray";
	onViewAll?: () => void;
}

export const PartnershipListWidget = memo(
	({
		partnerships,
		title = "제휴업체 목록",
		variant = "white",
		onViewAll,
	}: PartnershipListWidgetProps) => {
		return (
			<View className="gap-2">
				{/* Header */}
				<View className="flex-row items-center justify-between">
					<Text className="text-lg font-medium text-content-primary">
						{title}
					</Text>
					<Pressable onPress={onViewAll}>
						<Text className="text-base font-regular text-content-secondary">
							전체보기
						</Text>
					</Pressable>
				</View>

				{/* Cards list */}
				<View className="gap-5">
					{partnerships.map((partnership) => (
						<PartnershipCard
							key={partnership.id}
							{...partnership}
							variant={variant}
						/>
					))}
				</View>
			</View>
		);
	},
);

PartnershipListWidget.displayName = "PartnershipListWidget";
