import { Pressable, Text, View } from "react-native";
import type { StoreBenefit } from "@/entities/store";
import { CheckCircleOff, CheckCircleOn } from "@/shared/assets/icons";

interface PartnershipSelectItemProps {
	benefit: StoreBenefit;
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
				<View className="flex-row items-center gap-x-1.5">
					<View className="shrink-0 rounded-full bg-neutral px-2.5 py-1">
						<Text className="font-regular text-[11px] text-content-secondary">
							{benefit.adminName}
						</Text>
					</View>
					<Text className="flex-1 font-semibold text-sm">
						<Text className="text-content-primary">{benefit.content} </Text>
						{benefit.goods.length > 0 && (
							<Text className="text-primary">{benefit.goods.join(", ")}</Text>
						)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}
