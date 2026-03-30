import { Pressable, Text, View } from "react-native";
import { BellFill, Logo } from "@/shared/assets/icons";
import {
	MOCK_AFFILIATION_SUMMARIES,
	MOCK_PARTNERSHIPS,
} from "@/entities/partnership";
import { SummaryCard } from "@/shared/ui/summary-card";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PartnershipListWidget } from "@/widgets/partnership-list";

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
	const mockSummary = MOCK_AFFILIATION_SUMMARIES[0];
	return (
		<View className="gap-2">
			<Text className="text-base font-medium text-content-primary">
				🔍 제휴업체 추천
			</Text>
			<SummaryCard
				imageUrl={mockSummary?.imageUrl}
				title={mockSummary?.title || ""}
				subtitle={mockSummary?.address || ""}
				status={mockSummary?.status}
				dateRange={mockSummary?.dateRange}
				actionLabel={mockSummary?.status === "제휴중" ? "제휴 계약서 보기" : "문의하기"}
				onActionPress={noop}
			/>
		</View>
	);
}

// Manual registration button component
function ManualRegistrationButton() {
	return (
		<Pressable
			onPress={noop}
			className="rounded-lg bg-neutral-variant px-5 py-3.5"
		>
			<Text className="text-center text-xs font-regular text-content-primary">
				제휴 수동 등록하기
			</Text>
		</Pressable>
	);
}

export function AdminHomePage() {
	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-neutral"
			contentContainerClassName="gap-8 px-6 pb-6"
		>
			{/* Header */}
			<AdminHeaderSection onNotificationPress={noop} />

			{/* Title */}
			<Text className="text-2xl font-semibold text-content-primary">
				숭실대학교 총학생회
			</Text>

			{/* Content container */}
			<View className="gap-5">
				{/* Partnership list widget */}
				<PartnershipListWidget
					partnerships={MOCK_PARTNERSHIPS}
					onViewAll={noop}
				/>

				{/* Recommendation section */}
				<RecommendationSection />

				{/* Manual registration button */}
				<ManualRegistrationButton />
			</View>
		</PageLayout>
	);
}
