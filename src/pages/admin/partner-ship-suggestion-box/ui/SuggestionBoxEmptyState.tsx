// 제휴 건의함 빈 상태 — 건의가 없을 때 표시되는 안내 문구

import { Text, View } from "react-native";

export function SuggestionBoxEmptyState() {
	return (
		<View className="flex-1 items-center justify-center gap-[6px]">
			<Text className="text-md font-medium text-content-primary leading-body text-center">
				아직 제휴건의가 없어요
			</Text>
			<Text className="text-[14px] font-regular text-content-secondary leading-caption text-center">
				{"제휴건의가 들어오면 여기서\n내역을 확인할 수 있어요!"}
			</Text>
		</View>
	);
}
