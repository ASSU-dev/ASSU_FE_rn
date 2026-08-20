// 개별 혜택 카드 — 가게명, 혜택 설명, 날짜를 표시한다
import { Text, View } from "react-native";
import type { ReviewBenefitItem } from "../model/types";

interface BenefitCardProps extends ReviewBenefitItem {
	isFirst?: boolean;
	isLast?: boolean;
}

export function BenefitCard({
	storeName,
	date,
	time,
	description,
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
				<View className="flex-row gap-[4px]">
					<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
						{date}
					</Text>
					<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
						{time}
					</Text>
				</View>
			</View>
		</View>
	);
}
