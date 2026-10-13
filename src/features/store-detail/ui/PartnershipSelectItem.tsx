import { Pressable, Text, View } from "react-native";
import type { StoreBenefit } from "@/entities/store";
import { CheckCircleOff, CheckCircleOn } from "@/shared/assets/icons";

interface PartnershipSelectItemProps {
	benefit: StoreBenefit;
	isSelected: boolean;
	onPress: () => void;
}

function formatPartnershipPeriod(period: string): string {
	const formattedPeriod = period
		.trim()
		.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, "$1.$2.$3");

	return /^제휴기간(?:\s|$)/.test(formattedPeriod)
		? formattedPeriod
		: `제휴기간 ${formattedPeriod}`;
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
				<View className="flex-row items-start gap-x-1.5">
					<View className="shrink-0 rounded-full bg-neutral px-2.5 py-1">
						<Text className="font-regular text-[11px] text-content-secondary">
							{benefit.adminName}
						</Text>
					</View>
					<View className="flex-1 gap-0.5">
						<Text className="font-semibold text-sm text-content-primary">
							{benefit.paperContent}
						</Text>
						{benefit.partnershipPeriod ? (
							<Text className="font-regular text-xs text-content-tertiary">
								{formatPartnershipPeriod(benefit.partnershipPeriod)}
							</Text>
						) : null}
					</View>
				</View>
			</View>
		</Pressable>
	);
}
