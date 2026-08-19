// 통계 카드 컴포넌트 — label, count prop을 받는 회색 박스 하나
import { Text, View } from "react-native";

interface StatCardProps {
	label: string;
	count: number;
}

export function StatCard({ label, count }: StatCardProps) {
	return (
		<View className="flex-1 bg-neutral rounded-[10px] px-[14px] py-[15px] gap-[5px]">
			<Text className="text-md font-medium text-content-primary leading-caption tracking-caption">
				{label}
			</Text>
			<Text className="text-[11px] font-regular text-primary leading-caption tracking-caption">
				++ {count.toLocaleString()}
			</Text>
		</View>
	);
}
