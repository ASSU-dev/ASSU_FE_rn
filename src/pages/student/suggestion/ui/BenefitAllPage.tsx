// 내역 전체보기 페이지 — 특정 월의 모든 혜택 내역을 스크롤로 확인한다

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { useMyPartnerships } from "@/entities/partnership";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { createCurrentMonthMockBenefit } from "../model/mockBenefits";
import { useMonthNavigator } from "../model/useMonthNavigator";
import { BenefitEmptyState } from "./BenefitEmptyState";
import { BenefitList } from "./BenefitList";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";

export function BenefitAllPage() {
	const { year: yearParam, month: monthParam } = useLocalSearchParams<{
		year?: string;
		month?: string;
	}>();
	const now = new Date();
	const initialYear = yearParam ? parseInt(yearParam, 10) : now.getFullYear();
	const initialMonth = monthParam
		? parseInt(monthParam, 10)
		: now.getMonth() + 1;
	const { year, month, handlePrev, handleNext } = useMonthNavigator(
		initialYear,
		initialMonth,
	);
	const { data, isLoading, isError, error } = useMyPartnerships(year, month);

	const apiDetails = data?.details ?? [];
	const isCurrentMonth =
		year === now.getFullYear() && month === now.getMonth() + 1;
	const shouldShowCurrentMonthMock =
		__DEV__ &&
		!isLoading &&
		!isError &&
		isCurrentMonth &&
		apiDetails.length === 0;
	const benefits = shouldShowCurrentMonthMock
		? [createCurrentMonthMockBenefit(now)]
		: apiDetails;
	const count = shouldShowCurrentMonthMock
		? benefits.length
		: (data?.serviceCount ?? benefits.length);

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
					contentContainerClassName="flex-grow pt-[30px] pb-[60px]"
				>
					<View className="px-screen-m gap-5 pb-5">
						<MonthNavigator
							month={month}
							onPrev={handlePrev}
							onNext={handleNext}
						/>
						<BenefitSummary month={month} count={count} />
					</View>
					{isLoading ? (
						<View className="flex-1 items-center justify-center">
							<ActivityIndicator />
						</View>
					) : isError ? (
						<View className="flex-1 items-center justify-center">
							<Text className="text-danger">{String(error)}</Text>
						</View>
					) : count === 0 ? (
						<View className="flex-1 items-center justify-center">
							<BenefitEmptyState />
						</View>
					) : (
						<BenefitList benefits={benefits} />
					)}
				</ScrollView>
			</View>
		</PageLayout>
	);
}
