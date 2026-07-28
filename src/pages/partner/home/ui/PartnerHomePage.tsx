import { useRouter } from "expo-router";
import { View } from "react-native";
import {
	toPartnerAffiliationSummary,
	toPartnership,
	usePartnerAdminRecommend,
	usePartnerPartnerships,
} from "@/entities/partnership";
import { useOpenChatRoom } from "@/features/chat";
import { AppHeader } from "@/shared/ui/app-header";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PageTitle } from "@/shared/ui/page-title";
import { PartnershipListWidget } from "@/widgets/partnership-list";
import { PartnershipRecommendationWidget } from "@/widgets/partnership-recommendation";

const noop = () => {};

export function PartnerHomePage() {
	const router = useRouter();
	const { openChatRoom } = useOpenChatRoom();

	const { data: partnershipsData, isError: isPartnershipsError } =
		usePartnerPartnerships();
	const partnerships = partnershipsData?.content.map(toPartnership) ?? [];

	const renderPartnershipSection = () => {
		if (isPartnershipsError) {
			return (
				<EmptyState
					title="목록을 불러오지 못했어요"
					description={"잠시 후 다시 시도해주세요"}
				/>
			);
		}
		if (partnerships.length === 0) {
			return (
				<EmptyState
					title="진행 중인 제휴가 없어요"
					description={"제휴업체가 추가되면\n여기서 확인할 수 있어요!"}
				/>
			);
		}
		return (
			<PartnershipListWidget
				partnerships={partnerships}
				title="제휴단체 목록"
				maxItems={3}
				onViewAll={() =>
					router.push("/(protected)/partner/partner-partnership-list")
				}
				onPressCard={(id) =>
					router.push(`/(protected)/partnership-contract/${id}`)
				}
			/>
		);
	};

	const { data: recommendData } = usePartnerAdminRecommend();
	const summaries =
		recommendData?.admins.map(toPartnerAffiliationSummary) ?? [];

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-neutral"
			contentContainerClassName="px-6 pb-6"
		>
			<AppHeader onNotificationPress={noop} />

			<PageTitle title="역전할머니맥주" />

			<View className="gap-5">
				{renderPartnershipSection()}

				{summaries.length > 0 && (
					<PartnershipRecommendationWidget
						summaries={summaries}
						onContactPress={(adminId) =>
							openChatRoom({ role: "partner", targetId: adminId })
						}
					/>
				)}
			</View>
		</PageLayout>
	);
}
