import { memo } from "react";
import { Pressable, Text, View } from "react-native";

interface AffiliationSummaryCardProps {
	title: string;
	address: string;
	onPress?: () => void;
}

export const AffiliationSummaryCard = memo(
	({ title, address, onPress }: AffiliationSummaryCardProps) => {
		return (
			<View className="flex-1 gap-2.5 rounded-lg border border-neutral-variant bg-canvas px-5 py-3">
				{/* Title and address */}
				<View className="gap-2.5">
					<Text className="text-base font-semibold text-content-primary">
						{title}
					</Text>
					<Text
						numberOfLines={1}
						className="text-xs font-regular text-content-secondary"
					>
						{address}
					</Text>
				</View>

				{/* Action button */}
				<Pressable
					onPress={onPress}
					className="rounded-lg bg-primary px-5 py-2"
				>
					<Text className="text-center text-xs font-semibold text-content-inverse">
						문의하기
					</Text>
				</Pressable>
			</View>
		);
	},
);

AffiliationSummaryCard.displayName = "AffiliationSummaryCard";
