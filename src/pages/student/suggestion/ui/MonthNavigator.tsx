// 월 이동 네비게이터 — < n월 > 좌우 화살표로 조회 월을 변경한다
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

interface MonthNavigatorProps {
	month: number;
	onPrev: () => void;
	onNext: () => void;
}

export function MonthNavigator({ month, onPrev, onNext }: MonthNavigatorProps) {
	return (
		<View className="flex-row items-center gap-1">
			<Pressable onPress={onPrev} hitSlop={8}>
				<Ionicons
					name="chevron-back"
					size={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
			<Text className="font-medium text-lg text-content-primary leading-body tracking-body">
				{month}월
			</Text>
			<Pressable onPress={onNext} hitSlop={8}>
				<Ionicons
					name="chevron-forward"
					size={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
		</View>
	);
}
