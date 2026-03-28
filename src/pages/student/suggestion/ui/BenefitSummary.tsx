// 혜택 요약 문구 — "n월의 혜택 서비스 m건을 받았어요!" 텍스트를 표시한다
import { Text, View } from "react-native";

interface BenefitSummaryProps {
	month: number;
	count: number;
}

export function BenefitSummary({ month, count }: BenefitSummaryProps) {
	return (
		<View className="gap-gutter">
			<View className="flex-row items-start gap-1">
				<Text className="font-semibold text-[25px] text-primary leading-heading tracking-caption">
					{month}
				</Text>
				<Text className="font-semibold text-[25px] text-primary leading-heading tracking-caption">
					월의 혜택
				</Text>
			</View>
			<View className="flex-row items-start gap-1">
				<Text className="font-semibold text-[25px] text-content-primary leading-heading tracking-caption">
					서비스
				</Text>
				<Text className="font-semibold text-[25px] text-primary leading-heading tracking-caption">
					{count}
				</Text>
				<Text className="font-semibold text-[25px] text-content-primary leading-heading tracking-caption">
					건을 받았어요!
				</Text>
			</View>
		</View>
	);
}
