import { useRouter } from "expo-router";
import { View } from "react-native";
import {
	toPartnerAffiliationSummary,
	toPartnerPartnership,
	usePartnerAdminRecommend,
	usePartnerPartnerships,
} from "@/entities/partnership";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useOpenChatRoom } from "@/features/chat";
import { AppHeader } from "@/shared/ui/app-header";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PageTitle } from "@/shared/ui/page-title";
import { PartnershipListWidget } from "@/widgets/partnership-list";
import { PartnershipRecommendationWidget } from "@/widgets/partnership-recommendation";

export function PartnerHomePage() {
	const router = useRouter();
	const basicInfo = useUserBasicInfo();
	const { openChatRoom } = useOpenChatRoom();

	const {
		data: partnershipsData,
		isPending: isPartnershipsPending,
		isError: isPartnershipsError,
	} = usePartnerPartnerships();
	const partnerships =
		partnershipsData?.content.map(toPartnerPartnership) ?? [];

	const { data: recommendData, isPending: isRecommendPending } =
		usePartnerAdminRecommend();
	const summaries =
		recommendData?.admins.map(toPartnerAffiliationSummary) ?? [];

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-neutral"
			contentContainerClassName="px-6 pb-6"
			header={
				<AppHeader
					onNotificationPress={() =>
						router.push("/(protected)/partner/notification-center")
					}
					hasNotification={false}
				/>
			}
		>
			<PageTitle title={basicInfo?.name ?? ""} />

			<View className="gap-5">
				<PartnershipListWidget
					partnerships={partnerships}
					title="제휴단체 목록"
					maxItems={3}
					isLoading={isPartnershipsPending}
					isError={isPartnershipsError}
					emptyTitle="아직 함께하는 제휴단체가 없어요"
					emptyDescription="지금 제휴단체와의 제휴를 시작해보세요!"
					onViewAll={() =>
						router.push("/(protected)/partner/partner-partnership-list")
					}
					onPressCard={(id) =>
						router.push(`/(protected)/partnership-contract/${id}`)
					}
				/>

				<PartnershipRecommendationWidget
					summaries={summaries}
					isLoading={isRecommendPending}
					onContactPress={(adminId) =>
						openChatRoom({ role: "partner", targetId: adminId })
					}
				/>
			</View>
		</PageLayout>
	);
}
