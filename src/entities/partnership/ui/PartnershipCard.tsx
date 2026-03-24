import { memo } from "react";
import { Text, View } from "react-native";
import { formatDate } from "@/shared/utils";
import type { Partnership } from "../model/types";

const BADGE_LABEL_CONTENT = "제휴내용";
const BADGE_LABEL_PERIOD = "제휴기간";

interface PartnershipCardProps extends Partnership {
	variant?: "white" | "gray";
}

export const PartnershipCard = memo(
	({
		storeName,
		benefitContent,
		startDate,
		endDate,
		variant = "white",
	}: PartnershipCardProps) => {
		const bgClass = variant === "gray" ? "bg-neutral" : "bg-canvas";

		return (
			<View className={`flex-1 rounded-lg ${bgClass} px-4 py-5`}>
				{/* Store name */}
				<Text className="mb-5 text-lg font-semibold text-content-primary">
					{storeName}
				</Text>

				{/* Benefit content row */}
				<View className="mb-1 flex-row items-center gap-2">
					<View className="flex-shrink-0 rounded-full bg-sub px-2.5 py-2">
						<Text className="text-xs font-regular text-content-inverse">
							{BADGE_LABEL_CONTENT}
						</Text>
					</View>
					<View className="flex-1 justify-center">
						<Text className="text-xs font-regular text-content-secondary">
							{benefitContent}
						</Text>
					</View>
				</View>

				{/* Partnership period row */}
				<View className="flex-row items-center gap-2">
					<View className="flex-shrink-0 rounded-full bg-sub px-2.5 py-2">
						<Text className="text-xs font-regular text-content-inverse">
							{BADGE_LABEL_PERIOD}
						</Text>
					</View>
					<View className="flex-row items-center gap-1">
						<Text className="text-xs font-regular text-content-secondary">
							{formatDate(startDate)}
						</Text>
						<Text className="text-xs font-regular text-content-secondary">
							~
						</Text>
						<Text className="text-xs font-regular text-content-secondary">
							{formatDate(endDate)}
						</Text>
					</View>
				</View>
			</View>
		);
	},
);

PartnershipCard.displayName = "PartnershipCard";
