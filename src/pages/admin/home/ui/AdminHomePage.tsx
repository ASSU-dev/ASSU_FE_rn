import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import {
	toAdminAffiliationSummary,
	toAdminPartnership,
	useAdminPartnerRecommend,
	useAdminPartnerships,
} from "@/entities/partnership";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useOpenChatRoom } from "@/features/chat";
import { AppHeader } from "@/shared/ui/app-header";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PageTitle } from "@/shared/ui/page-title";
import { SummaryCard } from "@/shared/ui/summary-card";
import { PartnershipListWidget } from "@/widgets/partnership-list";

function RecommendationSection() {
	const { data, isPending } = useAdminPartnerRecommend();
	const { openChatRoom } = useOpenChatRoom();
	const summary = data ? toAdminAffiliationSummary(data) : null;

	return (
		<View className="gap-2">
			<Text className="text-lg font-medium text-content-primary">
				🔍 제휴업체 추천
			</Text>
			{isPending ? null : summary ? (
				<SummaryCard
					imageUrl={summary.partnerUrl}
					title={summary.title}
					subtitle={summary.address}
					actionLabel="문의하기"
					onActionPress={() =>
						openChatRoom({ role: "admin", targetId: summary.partnerId })
					}
				/>
			) : (
				<EmptyState
					title="추천할 제휴업체가 없어요"
					description="제휴업체가 추가되면 여기서 확인할 수 있어요!"
				/>
			)}
		</View>
	);
}

function ManualRegistrationButton({ onPress }: { onPress: () => void }) {
	return (
		<Pressable
			onPress={onPress}
			className="rounded-lg bg-neutral-variant px-5 py-3.5"
		>
			<Text className="text-center text-xs font-regular text-content-primary">
				제휴 수동 등록하기
			</Text>
		</Pressable>
	);
}

export function AdminHomePage() {
	const router = useRouter();
	const basicInfo = useUserBasicInfo();
	const {
		data: partnershipsData,
		isPending: isPartnershipsPending,
		isError: isPartnershipsError,
	} = useAdminPartnerships();
	const partnerships = partnershipsData?.content.map(toAdminPartnership) ?? [];

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
						router.push("/(protected)/admin/notification-center")
					}
					hasNotification={false}
				/>
			}
		>
			<PageTitle title={basicInfo?.name ?? ""} />

			<View className="gap-5">
				<PartnershipListWidget
					partnerships={partnerships}
					title="제휴업체 목록"
					maxItems={3}
					isLoading={isPartnershipsPending}
					isError={isPartnershipsError}
					emptyTitle="아직 등록된 제휴업체가 없어요"
					emptyDescription="지금 다른업체와의 제휴를 시작해보세요!"
					onViewAll={() =>
						router.push("/(protected)/admin/admin-partnership-list")
					}
					onPressCard={(id) =>
						router.push(`/(protected)/partnership-contract/${id}`)
					}
				/>

				<RecommendationSection />

				<ManualRegistrationButton
					onPress={() => router.push("/(protected)/partnership-proposal")}
				/>
			</View>
		</PageLayout>
	);
}
