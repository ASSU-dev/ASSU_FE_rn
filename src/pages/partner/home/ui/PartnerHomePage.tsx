import { useRouter } from "expo-router";
import { View } from "react-native";
import {
	MOCK_PARTNER_AFFILIATION_SUMMARIES,
	MOCK_PARTNERSHIPS,
} from "@/entities/partnership";
import { AppHeader } from "@/shared/ui/app-header";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PageTitle } from "@/shared/ui/page-title";
import { PartnershipListWidget } from "@/widgets/partnership-list";
import { PartnershipRecommendationWidget } from "@/widgets/partnership-recommendation";
import { MOCK_PARTNER_PAGE_INFO } from "../model/mockPartnerPageInfo";

// No-op for stable callback reference
const noop = () => {};

export function PartnerHomePage() {
	const router = useRouter();

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-neutral"
			contentContainerClassName="px-6 pb-6"
		>
			{/* Header */}
			<AppHeader onNotificationPress={noop} />

			{/* Store name title */}
			<PageTitle title={MOCK_PARTNER_PAGE_INFO.title} />

			{/* Content sections */}
			<View className="gap-5">
				{/* Partnership list widget with gray variant */}
				<PartnershipListWidget
					partnerships={MOCK_PARTNERSHIPS}
					title="제휴단체 목록"
					onViewAll={() =>
						router.push("/(protected)/partner/partner-partnership-list")
					}
					onPressCard={(id) =>
						router.push(`/(protected)/partnership-contract/${id}`)
					}
				/>

				{/* Recommendation widget with 2 cards */}
				<PartnershipRecommendationWidget
					summaries={MOCK_PARTNER_AFFILIATION_SUMMARIES}
					onContactPress={noop}
				/>
			</View>
		</PageLayout>
	);
}
