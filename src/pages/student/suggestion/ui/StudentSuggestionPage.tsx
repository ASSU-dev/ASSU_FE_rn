import { router } from "expo-router";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { useMyPartnerships } from "@/entities/partnership";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { useMonthNavigator } from "../model/useMonthNavigator";
import { BenefitEmptyState } from "./BenefitEmptyState";
import { BenefitList } from "./BenefitList";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";
import { SuggestionSection } from "./SuggestionSection";

const COLLAPSED_LIMIT = 3;

export function StudentSuggestionPage() {
	const now = new Date();
	const { year, month, handlePrev, handleNext } = useMonthNavigator(
		now.getFullYear(),
		now.getMonth() + 1,
	);

	const { data, isLoading, isError, error } = useMyPartnerships(year, month);

	const details = data?.details ?? [];
	const count = data?.serviceCount ?? 0;
	const displayBenefits = details.slice(0, COLLAPSED_LIMIT);

	return (
		<PageLayout contentContainerClassName="flex-1">
			<ScrollView className="flex-1" contentContainerClassName="flex-grow">
				<View className="px-screen-m gap-6 pt-10">
					<MonthNavigator
						month={month}
						onPrev={handlePrev}
						onNext={handleNext}
					/>
					<View className="flex-row items-end justify-between">
						<BenefitSummary month={month} count={count} />
						{count > COLLAPSED_LIMIT && (
							<Pressable
								onPress={() =>
									router.push(`/(protected)/student/benefit-all?month=${month}`)
								}
							>
								<Text className="font-regular text-sm text-content-secondary leading-caption tracking-caption">
									전체보기
								</Text>
							</Pressable>
						)}
					</View>
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
					<BenefitList benefits={displayBenefits} />
				)}
			</ScrollView>
			<SuggestionSection />
		</PageLayout>
	);
}
