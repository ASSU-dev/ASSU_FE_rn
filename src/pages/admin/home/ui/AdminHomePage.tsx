import { Pressable, Text, View } from "react-native";
import { BellFill, Logo } from "@/shared/assets/icons";
import { MOCK_PARTNERSHIPS } from "@/entities/partnership";
import { SummaryCard } from "@/shared/ui/summary-card";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PartnershipListWidget } from "@/widgets/partnership-list";

// Mock data for summary card
const MOCK_SUMMARY = {
	imageUrl:
		"https://www.figma.com/api/mcp/asset/b1ea7819-7170-4e36-84f4-70c0e9189d17",
	title: "역전할머니맥주 숭실대점",
	address: "서울 동작구 사당로 36-1 서정캐슬",
};

// Header section component
function AdminHeaderSection() {
	return (
		<View className="flex-row items-center justify-between">
			<Logo width={40} height={40} />
			<BellFill width={24} height={24} />
		</View>
	);
}

// Recommendation section component
function RecommendationSection() {
	return (
		<View className="gap-2">
			<Text className="text-base font-medium text-content-primary">
				🔍 제휴업체 추천
			</Text>
			<SummaryCard
				imageUrl={MOCK_SUMMARY.imageUrl}
				title={MOCK_SUMMARY.title}
				subtitle={MOCK_SUMMARY.address}
				actionLabel="문의하기"
				onActionPress={() => {
					// TODO: Handle contact action
				}}
			/>
		</View>
	);
}

// Manual registration button component
function ManualRegistrationButton() {
	return (
		<Pressable
			onPress={() => {
				// TODO: Handle registration action
			}}
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
			<AdminHeaderSection />

			{/* Title */}
			<Text className="text-2xl font-semibold text-content-primary">
				숭실대학교 총학생회
			</Text>

			{/* Content container */}
			<View className="gap-5">
				{/* Partnership list widget */}
				<PartnershipListWidget
					partnerships={MOCK_PARTNERSHIPS}
					onViewAll={() => {
						// TODO: Navigate to full partnership list
					}}
				/>

				{/* Recommendation section */}
				<RecommendationSection />

				{/* Manual registration button */}
				<ManualRegistrationButton />
			</View>
		</PageLayout>
	);
}
