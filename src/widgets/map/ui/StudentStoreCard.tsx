import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import type { SearchResultStore } from "@/entities/store";
import { countExtraBenefits, splitBenefitText } from "@/entities/store";

interface StudentStoreCardProps {
	store: SearchResultStore;
	/** 검색 응답에 혜택 목록이 없을 때 사용할 추가 제휴 개수 (제휴 목록 API extraCount) */
	fallbackExtraBenefitCount?: number;
	onPress?: () => void;
}

/** 학생 매장 검색 결과 카드 — 피그마 U-MAP-03-ST01 검색결과 카드 기준 */
export function StudentStoreCard({
	store,
	fallbackExtraBenefitCount = 0,
	onPress,
}: StudentStoreCardProps) {
	const { label, highlight } = splitBenefitText(store.benefit);
	const extraBenefitCount = store.partnerships
		? countExtraBenefits(store)
		: fallbackExtraBenefitCount;

	return (
		<Pressable
			onPress={onPress}
			disabled={!onPress}
			className="flex-row items-center p-gutter"
		>
			<View
				className="shrink-0 overflow-hidden bg-neutral"
				style={{ width: 81, height: 81, borderRadius: 7 }}
			>
				{store.imageUri ? (
					<Image
						source={{ uri: store.imageUri }}
						style={{ width: 81, height: 81 }}
						contentFit="cover"
						cachePolicy="memory-disk"
						recyclingKey={store.imageUri}
					/>
				) : null}
			</View>

			<View className="ml-[12px] flex-1 gap-[8px]">
				<View className="flex-row items-center justify-between gap-[8px]">
					<Text
						className="flex-1 font-medium text-sm tracking-[0.25px] text-content-primary"
						numberOfLines={1}
					>
						{store.name}
					</Text>
					{store.tag ? (
						<View className="shrink-0 rounded-[999px] bg-neutral px-gutter py-[2px]">
							<Text className="font-regular text-[11px] leading-[21px] tracking-[-0.32px] text-content-secondary">
								{store.tag}
							</Text>
						</View>
					) : null}
				</View>

				{label || highlight ? (
					<Text
						className="font-semibold text-md tracking-[-0.32px]"
						numberOfLines={1}
					>
						{label ? (
							<Text className="text-content-primary">{label}</Text>
						) : null}
						{highlight ? (
							<Text className="text-primary">{highlight}</Text>
						) : null}
					</Text>
				) : null}

				{extraBenefitCount > 0 ? (
					<Text className="font-regular text-[10px] tracking-[-0.32px] text-content-secondary">
						외 {extraBenefitCount}가지 제휴
					</Text>
				) : null}
			</View>
		</Pressable>
	);
}
