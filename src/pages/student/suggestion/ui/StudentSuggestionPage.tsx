import { useState } from "react";
import { View } from "react-native";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { BenefitSummary } from "./BenefitSummary";
import { MonthNavigator } from "./MonthNavigator";

export function StudentSuggestionPage() {
	const [month, setMonth] = useState(new Date().getMonth() + 1);

	const handlePrev = () => setMonth((m) => (m === 1 ? 12 : m - 1));
	const handleNext = () => setMonth((m) => (m === 12 ? 1 : m + 1));

	return (
		<PageLayout>
			<View className="px-screen-m gap-6 pt-10">
				<MonthNavigator month={month} onPrev={handlePrev} onNext={handleNext} />
				<BenefitSummary month={month} count={0} />
			</View>
		</PageLayout>
	);
}
