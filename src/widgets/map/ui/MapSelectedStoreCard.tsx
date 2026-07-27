import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import type { StoreMarker } from "@/entities/store";
import { StarIcon } from "@/shared/assets/icons/star-icon";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";

interface MapSelectedStoreCardProps {
	store: StoreMarker;
	onPress?: () => void;
}

export function MapSelectedStoreCard({
	store,
	onPress,
}: MapSelectedStoreCardProps) {
	const filledStars = Math.max(0, Math.min(5, Math.round(store.rate)));

	return (
		<Pressable
			onPress={onPress}
			disabled={!onPress}
			className="h-[122px] flex-row items-center justify-between rounded-[7px] bg-canvas px-[11px] py-[14px]"
			style={shadows.neutral}
		>
			<View className="flex-row items-center gap-[13px] py-[12px]">
				<View className="h-[70px] w-[70px] overflow-hidden rounded-[7px] bg-neutral">
					{store.imageUri ? (
						<Image
							source={{ uri: store.imageUri }}
							className="h-[70px] w-[70px]"
							resizeMode="cover"
						/>
					) : null}
				</View>
				<View className="max-w-[210px] gap-[8px]">
					<View>
						<Text
							className="text-lg font-medium leading-[20px] tracking-[0.25px] text-content-primary"
							numberOfLines={1}
						>
							{store.name}
						</Text>
						<Text
							className="text-sm font-regular leading-[21px] tracking-[-0.32px] text-content-secondary"
							numberOfLines={1}
						>
							{store.benefit ?? "제휴 혜택 정보를 확인해보세요"}
						</Text>
					</View>
					<View className="h-[20px] flex-row items-center">
						{[1, 2, 3, 4, 5].map((star) => (
							<StarIcon key={star} filled={star <= filledStars} size={20} />
						))}
					</View>
				</View>
			</View>
			<Ionicons
				name="chevron-forward"
				size={24}
				color={colorTokens.contentSecondary}
			/>
		</Pressable>
	);
}
