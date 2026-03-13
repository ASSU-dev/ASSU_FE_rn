import { useState } from "react";
import { View } from "react-native";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { BenefitEmptyState } from "./BenefitEmptyState";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";
import { SuggestionSection } from "./SuggestionSection";

export function StudentSuggestionPage() {
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const count = 0; // TODO: API 연결

	const handlePrev = () => setMonth((m) => (m === 1 ? 12 : m - 1));
	const handleNext = () => setMonth((m) => (m === 12 ? 1 : m + 1));

	return (
		<PageLayout contentContainerClassName="flex-1">
			<View className="flex-1">
				<View className="px-screen-m gap-6 pt-10">
					<MonthNavigator
						month={month}
						onPrev={handlePrev}
						onNext={handleNext}
					/>
					<BenefitSummary month={month} count={count} />
				</View>
				{count === 0 && (
					<View className="flex-1 items-center justify-center">
						<BenefitEmptyState />
					</View>
				)}
			</View>
			<SuggestionSection />
		</PageLayout>
	);
}
