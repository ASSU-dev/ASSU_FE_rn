import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import type { StoreMarker } from "@/entities/store";
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
				<View className="max-w-[210px] justify-center gap-[10px]">
					<Text
						className="text-lg font-medium leading-[20px] tracking-[0.25px] text-content-primary"
						numberOfLines={1}
					>
						{store.name}
					</Text>
					<Text
						className="text-base font-bold leading-[22px] tracking-[-0.32px] text-content-primary"
						numberOfLines={2}
					>
						{store.benefit ?? "제휴 혜택 정보를 확인해보세요"}
					</Text>
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
