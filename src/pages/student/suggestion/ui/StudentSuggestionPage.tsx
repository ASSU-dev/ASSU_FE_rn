import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { MOCK_BENEFITS } from "../model/mockBenefits";
import { getMonthFromDateStr } from "../model/types";
import { useBenefitsStore } from "../model/useBenefitsStore";
import { useMonthNavigator } from "../model/useMonthNavigator";
import { BenefitEmptyState } from "./BenefitEmptyState";
import { BenefitList } from "./BenefitList";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";
import { SuggestionSection } from "./SuggestionSection";

const COLLAPSED_LIMIT = 3;

export function StudentSuggestionPage() {
	const { month, handlePrev, handleNext } = useMonthNavigator(
		new Date().getMonth() + 1,
	);
	const { benefits, addBenefit } = useBenefitsStore();

	const benefitsForMonth = benefits.filter(
		(b) => getMonthFromDateStr(b.date) === month,
	);
	const count = benefitsForMonth.length;
	const displayBenefits = benefitsForMonth.slice(0, COLLAPSED_LIMIT);

	const handleAddRandom = () => {
		const random =
			MOCK_BENEFITS[Math.floor(Math.random() * MOCK_BENEFITS.length)];
		const dateStr = new Date().toISOString().split("T")[0];
		addBenefit({ ...random, id: `${random.id}-${Date.now()}`, date: dateStr });
	};

	return (
		<PageLayout contentContainerClassName="flex-1">
			<ScrollView className="flex-1" contentContainerClassName="flex-grow">
				<View className="px-screen-m gap-6 pt-10">
					<View className="flex-row items-center justify-between">
						<MonthNavigator
							month={month}
							onPrev={handlePrev}
							onNext={handleNext}
						/>
						<Pressable
							className="bg-neutral px-3 py-1.5 rounded-[8px]"
							onPress={handleAddRandom}
						>
							<Text className="font-medium text-sm text-content-secondary">
								+ 가게 추가
							</Text>
						</Pressable>
					</View>
					<View className="flex-row items-end justify-between">
						<BenefitSummary month={month} count={count} />
						{count > COLLAPSED_LIMIT && (
							<Pressable
								onPress={() =>
									router.push(
										`/(protected)/student/benefit-all?month=${month}`,
									)
								}
							>
								<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
									전체보기
								</Text>
							</Pressable>
						)}
					</View>
				</View>
				{count === 0 ? (
					<View className="flex-1 items-center justify-center">
						<BenefitEmptyState />
					</View>
				) : (
					<BenefitList benefits={displayBenefits} />
				)}
			</ScrollView>
			<SuggestionSection />
		</PageLayout>
	);
}
