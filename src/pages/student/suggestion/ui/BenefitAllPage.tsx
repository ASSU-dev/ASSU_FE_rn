// 내역 전체보기 페이지 — 특정 월의 모든 혜택 내역을 스크롤로 확인한다

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorTokens } from "@/shared/styles/tokens";
import { BenefitList } from "./BenefitList";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";
import type { Benefit } from "./mockBenefits";

interface BenefitAllPageProps {
	initialMonth: number;
	benefits: Benefit[];
}

export function BenefitAllPage({
	initialMonth,
	benefits,
}: BenefitAllPageProps) {
	const [month, setMonth] = useState(initialMonth);
	const handlePrev = () => setMonth((m) => (m === 1 ? 12 : m - 1));
	const handleNext = () => setMonth((m) => (m === 12 ? 1 : m + 1));

	const benefitsForMonth = benefits.filter((b) => {
		const benefitMonth = parseInt(b.date.split("-")[1], 10);
		return benefitMonth === month;
	});

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-content-inverse">
			{/*뒤로가기 버튼 + 제휴 내역 타이틀 */}
			<View className="flex-row items-center px-screen-m py-3 gap-[5px]">
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<Ionicons
						name="chevron-back"
						size={24}
						color={colorTokens.contentPrimary}
					/>
				</Pressable>
				<Text className="font-semibold text-xl text-content-primary">
					제휴 내역
				</Text>
			</View>

			<View className="flex-1 rounded-tl-[30px] rounded-tr-[30px] bg-canvas overflow-hidden">
				<ScrollView
					className="flex-1"
					contentContainerClassName="pt-[30px] pb-[60px]"
				>
					<View className="px-screen-m gap-5 pb-5">
						<MonthNavigator
							month={month}
							onPrev={handlePrev}
							onNext={handleNext}
						/>
						<BenefitSummary month={month} count={benefitsForMonth.length} />
					</View>
					<BenefitList benefits={benefitsForMonth} />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
