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
			<View className="rounded-lg border-[0.5px] border-neutral-variant bg-canvas px-5 py-gutter">
				<View className="flex-row items-center gap-5 py-3">
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

					<View className="flex-1 justify-between gap-gutter">
						<View>
							<Text className="text-lg font-medium text-content-primary">
								{title}
							</Text>
							{status === "제휴중" ? (
								<View className="mt-1 flex-row items-center gap-2">
									<View className="rounded-full bg-neutral px-2.5 py-1">
										<Text className="text-[11px] font-regular text-content-secondary">
											제휴중
										</Text>
									</View>
									<Text className="text-sm font-regular text-content-secondary">
										{dateRange}
									</Text>
								</View>
							) : (
								<Text
									numberOfLines={1}
									className="text-sm font-regular text-content-secondary"
								>
									{subtitle}
								</Text>
							)}
						</View>

						{actionLabel ? (
							<Pressable
								onPress={onActionPress}
								className={`rounded-lg px-gutter py-[5px] ${
									isAffiliated ? "bg-primary" : "bg-primary-tint"
								}`}
							>
								<Text
									className={`text-center font-regular ${
										isAffiliated
											? "text-sm text-content-inverse"
											: "text-[11px] text-primary"
									}`}
								>
									{actionLabel}
								</Text>
							</Pressable>
						) : null}
					</View>
				</View>
			</View>
		);
	},
);
