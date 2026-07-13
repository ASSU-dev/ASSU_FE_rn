// 관리자 대시보드 페이지 — 제휴 사용자 현황 전체 레이아웃

import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useAdminDashboard } from "@/features/admin-dashboard";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { StatCards } from "./StatCards";
import { UsageSection } from "./UsageSection";

const headingClassName =
	"text-[22px] font-semibold text-content-primary leading-caption tracking-caption";

export function AdminDashboardPage() {
	const { data, isLoading, isError, error } = useAdminDashboard();

	return (
		<PageLayout
			scrollable
			contentContainerClassName="px-screen-m gap-[30px] pt-10 pb-10"
		>
			<View className="gap-3 px-1">
				<Text className={headingClassName}>
					{data?.adminName ?? "숭실대학교 총학생회"}
				</Text>
				<Text className={headingClassName}>제휴 사용자가 얼마나 많을까요?</Text>
			</View>

			{isLoading ? (
				<View className="items-center py-screen-m">
					<ActivityIndicator />
				</View>
			) : isError ? (
				<Text className="text-center text-sm text-danger">{String(error)}</Text>
			) : data ? (
				<>
					<StatCards stats={data.stats} />
					<UsageSection
						monthlyUsage={data.monthlyUsage}
						insight={data.insight}
					/>
				</>
			) : null}

			<TouchableOpacity
				activeOpacity={0.8}
				className="bg-primary items-center justify-center rounded-[8px] h-[41px]"
				onPress={() => {
					router.push("/(protected)/admin/partner-ship-suggestion-box");
				}}
			>
				<Text className="text-[11px] font-semibold text-content-inverse leading-caption tracking-caption">
					제휴건의함 확인하기
				</Text>
			</TouchableOpacity>
		</PageLayout>
	);
}
