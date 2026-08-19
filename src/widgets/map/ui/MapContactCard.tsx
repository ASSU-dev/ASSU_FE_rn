import { Image, Pressable, Text, View } from "react-native";

import type { StoreMarker } from "@/entities/store";
import { shadows } from "@/shared/styles/shadows";

interface MapContactCardProps {
	store: StoreMarker;
	onContactPress?: () => void;
	isContactPending?: boolean;
}

/** 지도 마커 선택 시 노출되는 문의 카드 (이미지 · 이름 · 주소 · 문의하기 버튼) */
export function MapContactCard({
	store,
	onContactPress,
	isContactPending = false,
}: MapContactCardProps) {
	return (
		<View
			className="flex-row items-center gap-[20px] rounded-[7px] bg-canvas px-[20px] py-[22px]"
			style={shadows.neutral}
		>
			<View className="h-[70px] w-[70px] overflow-hidden rounded-[7px] bg-neutral">
				{store.imageUri ? (
					<Image
						source={{ uri: store.imageUri }}
						className="h-[70px] w-[70px]"
						resizeMode="cover"
					/>
				) : null}
			</View>
			<View className="flex-1 gap-[10px]">
				<View>
					<Text
						className="text-lg font-medium leading-[20px] tracking-[0.25px] text-content-primary"
						numberOfLines={1}
					>
						{store.name}
					</Text>
					<Text
						className="text-[13px] font-regular leading-caption tracking-caption text-content-secondary"
						numberOfLines={1}
					>
						{store.address}
					</Text>
				</View>
				<Pressable
					onPress={onContactPress}
					disabled={!onContactPress || isContactPending}
					className="items-center justify-center rounded-[8px] bg-primary px-[10px] py-[5px]"
				>
					<Text className="text-[11px] font-regular leading-caption tracking-caption text-content-inverse">
						문의하기
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
