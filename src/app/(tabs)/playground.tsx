/**
 * ⚠️ 임시 Playground 페이지
 * - 컴포넌트 UI 확인용으로만 사용
 * - PR/배포 전 삭제 권장
 *
 * 접근 경로: /playground
 */

import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { Select } from "@/shared/ui";

export default function PlaygroundScreen() {
	const councilItems = useMemo(
		() => [
			{ label: "총학생회", value: "university" },
			{ label: "단과대학 학생회", value: "college" },
			{ label: "학과/부 학생회", value: "department" },
		],
		[]
	);

	const [councilType, setCouncilType] = useState<string | null>(null);

	return (
		<ScrollView className="flex-1 bg-canvas" contentContainerStyle={{ padding: 24 }}>
			<View className="mb-6">
				<Text className="text-2xl font-bold text-content-primary mb-2">
					Playground
				</Text>
				<Text className="text-sm font-regular text-content-secondary mb-3">
					임시 UI 확인 화면입니다. 작업 후 삭제하세요.
				</Text>
				<Link href="/(tabs)" asChild>
					<Text className="text-sm font-medium text-primary">← 홈으로</Text>
				</Link>
			</View>

			<View className="mb-8">
				<Select
					label="단과"
					items={councilItems}
					value={councilType}
					onChange={setCouncilType}
					placeholder="학생회 유형을 선택하세요"
					helperText="items/value/onChange만 바꿔서 재사용합니다."
				/>
				<Text className="mt-4 text-content-secondary font-regular">
					선택된 값: {councilType ?? "없음"}
				</Text>
			</View>
		</ScrollView>
	);
}

