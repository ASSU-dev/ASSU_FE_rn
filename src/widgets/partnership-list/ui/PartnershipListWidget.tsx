import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { type Partnership, PartnershipCard } from "@/entities/partnership";

interface PartnershipListWidgetProps {
	partnerships: Partnership[];
	title?: string;
	variant?: "white" | "gray";
	maxItems?: number;
	onViewAll?: () => void;
	onPressCard?: (id: string) => void;
}

export const PartnershipListWidget = memo(
	({
		partnerships,
		title = "제휴단체 목록",
		variant = "white",
		maxItems,
		onViewAll,
		onPressCard,
	}: PartnershipListWidgetProps) => {
		const displayed = maxItems ? partnerships.slice(0, maxItems) : partnerships;

		return (
			<View className="gap-2">
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

				<View className="gap-5">
					{displayed.map((partnership) => (
						<Pressable
							key={partnership.id}
							onPress={() => onPressCard?.(partnership.id)}
						>
							<PartnershipCard {...partnership} variant={variant} />
						</Pressable>
					))}
				</View>
			</View>
		);
	},
);

PartnershipListWidget.displayName = "PartnershipListWidget";
