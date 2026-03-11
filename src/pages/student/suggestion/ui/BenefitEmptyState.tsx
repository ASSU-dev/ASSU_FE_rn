// 혜택 빈 상태 텍스트 — 혜택 건수가 0일 때 가운데에 표시된다
import { Text, View } from "react-native";

export function BenefitEmptyState() {
	return (
		<View className="items-center gap-[6px]">
			<Text className="font-medium text-md text-content-primary leading-caption tracking-caption text-center">
				아직 받은 혜택이 없어요!
			</Text>
			<Text className="font-regular text-[14px] text-content-secondary text-center">
				받을 수 있는 제휴 혜택을 확인해보세요
			</Text>
		</View>
	);
}
