import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import {
	toAdminAffiliationSummary,
	toPartnership,
	useAdminPartnerRecommend,
	useAdminPartnerships,
} from "@/entities/partnership";
import { BellFill, Logo } from "@/shared/assets/icons";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PageTitle } from "@/shared/ui/page-title";
import { SummaryCard } from "@/shared/ui/summary-card";
import { PartnershipListWidget } from "@/widgets/partnership-list";

const noop = () => {};

function AdminHeaderSection({
	onNotificationPress,
}: {
	onNotificationPress: () => void;
}) {
	return (
		<View className="flex-row items-center justify-between">
			<Logo width={40} height={40} />
			<Pressable onPress={onNotificationPress}>
				<BellFill width={24} height={24} />
			</Pressable>
		</View>
	);
}

function RecommendationSection() {
	const { data } = useAdminPartnerRecommend();
	const summary = data ? toAdminAffiliationSummary(data) : null;

	if (!summary) return null;

	return (
		<View className="gap-2">
			<Text className="text-lg font-medium text-content-primary">
				🔍 제휴업체 추천
			</Text>
			<SummaryCard
				title={summary.title}
				subtitle={summary.address}
				status={summary.status}
				dateRange={summary.dateRange}
				actionLabel="문의하기"
				onActionPress={noop}
			/>
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
	const { data: partnershipsData, isError: isPartnershipsError } =
		useAdminPartnerships();
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
				maxItems={3}
				onViewAll={() =>
					router.push("/(protected)/admin/admin-partnership-list")
				}
				onPressCard={(id) =>
					router.push(`/(protected)/partnership-contract/${id}`)
				}
			/>
		);
	};

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-neutral"
			contentContainerClassName="px-6 pb-6"
		>
			<AdminHeaderSection onNotificationPress={noop} />

			<PageTitle title="숭실대학교 총학생회" />

			<View className="gap-5">
				{renderPartnershipSection()}

				<RecommendationSection />

				<ManualRegistrationButton
					onPress={() => router.push("/(protected)/partnership-proposal")}
				/>
			</View>
		</PageLayout>
	);
}
