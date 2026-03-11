// 개별 혜택 카드 — 가게명, 혜택 설명, 날짜, 리뷰 작성 버튼을 표시한다
import { Pressable, Text, View } from "react-native";
import type { Benefit } from "./mockBenefits";

interface BenefitCardProps extends Benefit {
	onReviewPress?: () => void;
	isFirst?: boolean;
	isLast?: boolean;
}

export function BenefitCard({
	storeName,
	date,
	time,
	description,
	onReviewPress,
	isFirst,
	isLast,
}: BenefitCardProps) {
	return (
		<View
			className="px-screen-m gap-[3px]"
			style={{ paddingTop: isFirst ? 40 : 20, paddingBottom: isLast ? 15 : 20 }}
		>
			<View className="flex-row items-center justify-between">
				<Text className="font-medium text-lg text-content-primary leading-body tracking-body">
					{storeName}
				</Text>
				<View className="flex-row gap-[4px]">
					<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
						{date}
					</Text>
					<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
						{time}
					</Text>
				</View>
			</View>
			<View className="flex-row items-center justify-between">
				<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption flex-1 mr-2">
					{description}
				</Text>
				<Pressable
					className="bg-neutral px-gutter py-[5px] rounded-[8px]"
					onPress={onReviewPress}
				>
					<Text className="font-regular text-[11px] text-content-secondary leading-caption tracking-caption">
						리뷰 작성하기
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
