import type {
	CountAdminAuthResponseDto,
	CountUsageListResponseDto,
	CountUsagePersonResponseDto,
	CountUsageResponseDto,
	NewCountAdminResponseDto,
} from "../model/api-types";
import type { DashboardData, MonthlyUsage } from "../model/types";

export function toAdminDashboardData({
	auth,
	newCount,
	todayUsage,
	topUsage,
	usageList,
}: {
	auth: CountAdminAuthResponseDto;
	newCount: NewCountAdminResponseDto;
	todayUsage: CountUsagePersonResponseDto;
	topUsage: CountUsageResponseDto | null;
	usageList: CountUsageListResponseDto;
}): DashboardData {
	const monthlyUsage: MonthlyUsage[] = (usageList?.items ?? [])
		.slice(0, 6)
		.map((item) => ({
			month: item.storeName,
			count: item.usageCount,
		}));

	return {
		adminName: auth.adminName,
		stats: {
			appCertified: auth.studentCount,
			newJoined: newCount.newStudentCount,
			affiliateUsers: todayUsage.usagePersonCount,
		},
		monthlyUsage,
		insight: {
			topStoreName: topUsage?.storeName ?? null,
			expectedCount: topUsage?.usageCount ?? 0,
		},
	};
}
