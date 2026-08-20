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
			<View className="flex-1 gap-2.5 rounded-[7px] border-[0.5px] border-neutral-variant bg-canvas px-5 py-[22px]">
				<View className="gap-2.5">
					<Text className="text-lg font-semibold leading-[20px] tracking-[0.25px] text-content-primary">
						{title}
					</Text>
					<Text
						numberOfLines={2}
						className="text-sm font-regular leading-caption tracking-caption text-content-secondary"
					>
						{address}
					</Text>
				</View>

				<Pressable
					onPress={onPress}
					className="items-center justify-center rounded-lg bg-primary px-2.5 py-[5px]"
				>
					<Text className="text-[11px] font-regular leading-caption tracking-caption text-content-inverse">
						문의하기
					</Text>
				</Pressable>
			</View>
		);
	},
);

AffiliationSummaryCard.displayName = "AffiliationSummaryCard";
