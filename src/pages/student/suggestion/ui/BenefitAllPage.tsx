// 내역 전체보기 페이지 — 특정 월의 모든 혜택 내역을 스크롤로 확인한다

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { getMonthFromDateStr } from "../model/types";
import { useBenefitsStore } from "../model/useBenefitsStore";
import { useMonthNavigator } from "../model/useMonthNavigator";
import { BenefitList } from "./BenefitList";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";

export function BenefitAllPage() {
	const { month: monthParam } = useLocalSearchParams<{ month: string }>();
	const now = new Date();
	const initialYear = now.getFullYear();
	const initialMonth = monthParam
		? parseInt(monthParam, 10)
		: now.getMonth() + 1;
	const { month, handlePrev, handleNext } = useMonthNavigator(
		initialYear,
		initialMonth,
	);
	const benefits = useBenefitsStore((s) => s.benefits);

	const benefitsForMonth = benefits.filter(
		(b) => getMonthFromDateStr(b.date) === month,
	);

	return (
		<PageLayout
			className="flex-1 bg-content-inverse"
			contentContainerClassName="flex-1"
		>
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
		</PageLayout>
	);
}
