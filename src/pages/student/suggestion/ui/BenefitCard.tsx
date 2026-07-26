// 개별 혜택 카드 — 가게명, 혜택 설명, 날짜, 리뷰 작성 버튼을 표시한다
import { Pressable, Text, View } from "react-native";
import type { ReviewBenefitItem } from "../model/types";

interface BenefitCardProps extends ReviewBenefitItem {
	onReviewPress?: () => void;
	isFirst?: boolean;
	isLast?: boolean;
}

export function BenefitCard({
	storeName,
	date,
	time,
	description,
	isReviewed,
	onReviewPress,
	isFirst,
	isLast,
}: BenefitCardProps) {
	return (
		<View
			className="px-screen-m"
			style={{ paddingTop: isFirst ? 40 : 20, paddingBottom: isLast ? 15 : 20 }}
		>
			<View className="flex-row items-start justify-between">
				<View className="mr-2 flex-1 gap-[10.5px]">
					<Text className="font-medium text-lg text-content-primary leading-body tracking-body">
						{storeName}
					</Text>
					<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
						{description}
					</Text>
				</View>
				<View className="items-end gap-[5px]">
					<View className="flex-row gap-[4px]">
						<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
							{date}
						</Text>
						<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
							{time}
						</Text>
					</View>
					<Pressable
						className="bg-neutral px-gutter py-[5px] rounded-[8px]"
						disabled={isReviewed}
						onPress={onReviewPress}
					>
						<Text className="font-regular text-[11px] text-content-secondary leading-caption tracking-caption">
							{isReviewed ? "작성완료" : "리뷰 작성하기"}
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
