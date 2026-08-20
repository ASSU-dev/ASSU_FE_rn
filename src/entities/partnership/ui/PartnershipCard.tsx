import { memo } from "react";
import { Text, View } from "react-native";
import { formatDate } from "@/shared/utils";
import type { Partnership } from "../model/types";

const BADGE_LABEL_CONTENT = "제휴내용";
const BADGE_LABEL_PERIOD = "제휴기간";

interface PartnershipCardProps extends Partnership {
	variant?: "white" | "gray";
}

const bodyTextClassName =
	"text-sm font-regular leading-caption tracking-caption text-content-secondary";

export const PartnershipCard = memo(
	({
		storeName,
		benefitContent,
		startDate,
		endDate,
		variant = "white",
	}: PartnershipCardProps) => {
		const bgClass = variant === "gray" ? "bg-neutral" : "bg-canvas";
		const badgeBgClass = variant === "gray" ? "bg-sub" : "bg-primary-tint";
		const badgeTextClass =
			variant === "gray" ? "text-content-inverse" : "text-primary";
		const badgeClassName = `flex-shrink-0 rounded-full ${badgeBgClass} px-2.5`;
		const badgeLabelClassName = `text-sm font-regular leading-caption tracking-caption ${badgeTextClass}`;

		return (
			<View className={`gap-5 rounded-lg ${bgClass} px-[15px] py-5`}>
				<Text className="text-lg font-semibold leading-[20px] tracking-[0.25px] text-content-primary">
					{storeName}
				</Text>

				<View className="gap-[3px]">
					{/* Benefit content row */}
					<View className="flex-row items-start gap-2">
						<View className={badgeClassName}>
							<Text className={badgeLabelClassName}>{BADGE_LABEL_CONTENT}</Text>
						</View>
						<Text className={`shrink ${bodyTextClassName}`}>
							{benefitContent}
						</Text>
					</View>

					{/* Partnership period row */}
					<View className="flex-row items-center gap-2">
						<View className={badgeClassName}>
							<Text className={badgeLabelClassName}>{BADGE_LABEL_PERIOD}</Text>
						</View>
						<View className="flex-row items-center gap-1">
							<Text className={bodyTextClassName}>{formatDate(startDate)}</Text>
							<Text className={bodyTextClassName}>~</Text>
							<Text className={bodyTextClassName}>{formatDate(endDate)}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	},
);

PartnershipCard.displayName = "PartnershipCard";
