import { Pressable, Text, View } from "react-native";
import type { PartnershipBenefit } from "@/features/partnership-auth/model/types";
import { CheckCircleOff, CheckCircleOn } from "@/shared/assets/icons";

interface PartnershipSelectItemProps {
	benefit: PartnershipBenefit;
	isSelected: boolean;
	onPress: () => void;
}

export function PartnershipSelectItem({
	benefit,
	isSelected,
	onPress,
}: PartnershipSelectItemProps) {
	return (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center bg-canvas gap-3 rounded-card border px-4 py-3 ${
				isSelected ? "border-primary" : "border-neutral-variant"
			}`}
		>
			{isSelected ? (
				<CheckCircleOn width={22} height={22} />
			) : (
				<CheckCircleOff width={22} height={22} />
			)}
			<View className="flex-1 gap-1.5">
				<View className="flex-row flex-wrap items-center gap-x-1.5 gap-y-1">
					<View className="shrink-0 rounded-full bg-neutral px-2.5 py-1">
						<Text className="font-regular text-[11px] text-content-secondary">
							{benefit.manager}
						</Text>
					</View>
					<Text className="font-semibold text-sm">
						<Text className="text-content-primary">{benefit.contents} </Text>
						{benefit.goods.length > 0 && (
							<Text className="text-primary">{benefit.goods.join(", ")}</Text>
						)}
					</Text>
				</View>
				{benefit.startDate && benefit.endDate && (
					<Text className="font-regular text-xs text-content-tertiary">
						제휴기간 {benefit.startDate} ~ {benefit.endDate}
					</Text>
				)}
			</View>
		</Pressable>
	);
}
