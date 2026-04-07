import { memo } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface SummaryCardProps {
	imageUrl?: string;
	title: string;
	subtitle: string;
	actionLabel?: string;
	onActionPress?: () => void;
	status?: "제휴중" | "제휴예정";
	dateRange?: string;
}

export const SummaryCard = memo(
	({
		imageUrl,
		title,
		subtitle,
		actionLabel,
		onActionPress,
		status,
		dateRange,
	}: SummaryCardProps) => {
		const isAffiliated = status === "제휴중";
		return (
			<View className="flex-row items-center gap-5 rounded-lg border border-neutral-variant bg-canvas px-5 py-3">
				{/* Image */}
				{imageUrl ? (
					<View className="h-[70px] w-[70px] shrink-0 overflow-hidden rounded-lg">
						<Image
							source={{ uri: imageUrl }}
							className="h-full w-full"
							resizeMode="cover"
						/>
					</View>
				) : (
					<View className="h-[70px] w-[70px] shrink-0 rounded-lg bg-neutral" />
				)}

				{/* Content */}
				<View className="flex-1 justify-between gap-2.5">
					{/* Title and status/info */}
					<View className="gap-2">
						<Text className="text-base font-semibold text-content-primary">
							{title}
						</Text>
						{status === "제휴중" ? (
							<View className="flex-row items-center gap-2">
								<View className="rounded-full bg-neutral px-2.5 py-1">
									<Text className="text-[11px] font-regular text-content-secondary">
										제휴중
									</Text>
								</View>
								<Text className="text-xs font-regular text-content-secondary">
									{dateRange}
								</Text>
							</View>
						) : (
							<Text
								numberOfLines={1}
								className="text-xs font-regular text-content-secondary"
							>
								{subtitle}
							</Text>
						)}
					</View>

					{/* Action button */}
					{actionLabel ? (
						<Pressable
							onPress={onActionPress}
							className={`rounded-lg px-5 py-3 ${
								isAffiliated ? "bg-primary" : "bg-primary-tint"
							}`}
						>
							<Text
								className={`text-center font-semibold ${
									isAffiliated ? "text-sm text-white" : "text-xs text-primary"
								}`}
							>
								{actionLabel}
							</Text>
						</Pressable>
					) : null}
				</View>
			</View>
		);
	},
);
