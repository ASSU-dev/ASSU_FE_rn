import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { BellFill, Logo } from "@/shared/assets/icons";
import {
	MOCK_ADMIN_AFFILIATION_SUMMARY,
	MOCK_PARTNERSHIPS,
} from "@/entities/partnership";
import { SummaryCard } from "@/shared/ui/summary-card";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PageTitle } from "@/shared/ui/page-title";
import { PartnershipListWidget } from "@/widgets/partnership-list";
import { MOCK_ADMIN_PAGE_INFO } from "../model/mockAdminPageInfo";

// No-op for stable callback reference
const noop = () => {};

// Admin header section component
function AdminHeaderSection({ onNotificationPress }: { onNotificationPress: () => void }) {
	return (
		<View className="flex-row items-center justify-between">
			<Logo width={40} height={40} />
			<Pressable onPress={onNotificationPress}>
				<BellFill width={24} height={24} />
			</Pressable>
		</View>
	);
}

// Recommendation section component
function RecommendationSection() {
	return (
		<View className="gap-2">
			<Text className="text-lg font-medium text-content-primary">
				🔍 제휴업체 추천
			</Text>
			<SummaryCard
				imageUrl={MOCK_ADMIN_AFFILIATION_SUMMARY?.imageUrl}
				title={MOCK_ADMIN_AFFILIATION_SUMMARY?.title || ""}
				subtitle={MOCK_ADMIN_AFFILIATION_SUMMARY?.address || ""}
				status={MOCK_ADMIN_AFFILIATION_SUMMARY?.status}
				dateRange={MOCK_ADMIN_AFFILIATION_SUMMARY?.dateRange}
				actionLabel={MOCK_ADMIN_AFFILIATION_SUMMARY?.status === "제휴중" ? "제휴 계약서 보기" : "문의하기"}
				onActionPress={noop}
			/>
		</View>
	);
}

// Manual registration button component
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

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-neutral"
			contentContainerClassName="px-6 pb-6"
		>
			{/* Header */}
			<AdminHeaderSection onNotificationPress={noop} />

			{/* Title */}
			<PageTitle title={MOCK_ADMIN_PAGE_INFO.title} />

			{/* Content container */}
			<View className="gap-5">
				{/* Partnership list widget */}
				<PartnershipListWidget
					partnerships={MOCK_PARTNERSHIPS}
					onViewAll={() => router.push("/(protected)/(admin)/admin-partnership-list")}
				/>

				{/* Recommendation section */}
				<RecommendationSection />

				{/* Manual registration button */}
				<ManualRegistrationButton onPress={() => router.push("/(protected)/partnership-proposal")} />
			</View>
		</PageLayout>
	);
}
