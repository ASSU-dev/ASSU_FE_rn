import { Image, Pressable, Text, View } from "react-native";

interface SummaryCardProps {
	imageUrl?: string;
	title: string;
	subtitle: string;
	actionLabel?: string;
	onActionPress?: () => void;
}

export const SummaryCard = ({
	imageUrl,
	title,
	subtitle,
	actionLabel,
	onActionPress,
}: SummaryCardProps) => {
	return (
		<View className="flex-row gap-5 rounded-lg border border-neutral-variant bg-canvas px-5 py-3">
			{/* Image */}
			{imageUrl ? (
				<View className="h-[70px] w-[70px] overflow-hidden rounded-lg">
					<Image
						source={{ uri: imageUrl }}
						className="h-full w-full"
						resizeMode="cover"
					/>
				</View>
			) : (
				<View className="h-[70px] w-[70px] rounded-lg bg-neutral" />
			)}

			{/* Content */}
			<View className="flex-1 justify-center gap-2.5">
				{/* Title and subtitle */}
				<View>
					<Text className="text-base font-semibold text-content-primary">
						{title}
					</Text>
					<Text
						numberOfLines={1}
						className="text-xs font-regular text-content-secondary"
					>
						{subtitle}
					</Text>
				</View>

				{/* Action button */}
				{actionLabel ? (
					<Pressable
						onPress={onActionPress}
						className="self-start rounded-lg bg-primary-tint px-2.5 py-1.5"
					>
						<Text className="text-[11px] font-regular text-primary">
							{actionLabel}
						</Text>
					</Pressable>
				) : null}
			</View>
		</View>
	);
};
