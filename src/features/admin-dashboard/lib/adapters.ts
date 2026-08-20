import type {
	CountAdminAuthResponseDto,
	CountUsageListResponseDto,
	CountUsagePersonResponseDto,
	CountUsageResponseDto,
	NewCountAdminResponseDto,
} from "../model/api-types";
import type { DashboardData, UsageBar } from "../model/types";

export function toAdminDashboardData({
	auth,
	newCount,
	todayUsage,
	topUsage,
	usageList,
}: {
	auth: CountAdminAuthResponseDto | null;
	newCount: NewCountAdminResponseDto | null;
	todayUsage: CountUsagePersonResponseDto | null;
	topUsage: CountUsageResponseDto | null;
	usageList: CountUsageListResponseDto | null;
}): DashboardData {
	// 누적 사용 수 상위 5개 업체 → 회색 막대, 마지막 "예상" 막대는 UI에서 insight로 추가
	const usageBars: UsageBar[] = (usageList?.items ?? [])
		.slice(0, 5)
		.map((item) => ({
			label: item.storeName,
			count: item.usageCount,
		}));

	return {
		adminName:
			auth?.adminName ??
			newCount?.adminName ??
			todayUsage?.adminName ??
			topUsage?.adminName ??
			"",
		stats: {
			appCertified: auth?.studentCount ?? 0,
			newJoined: newCount?.newStudentCount ?? 0,
			affiliateUsers: todayUsage?.usagePersonCount ?? 0,
		},
		usageBars,
		insight: {
			topStoreName: topUsage?.storeName ?? null,
			expectedCount: topUsage?.usageCount ?? 0,
		},
	};
}
