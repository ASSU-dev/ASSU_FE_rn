import { useQuery } from "@tanstack/react-query";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import { toAdminDashboardData } from "../lib/adapters";
import type {
	CountAdminAuthResponseDto,
	CountUsageListResponseDto,
	CountUsagePersonResponseDto,
	CountUsageResponseDto,
	NewCountAdminResponseDto,
} from "../model/api-types";
import type { DashboardData } from "../model/types";

async function fetchAdminDashboard(): Promise<DashboardData> {
	if (__DEV__)
		console.log("[fetchAdminDashboard] 요청:", [
			"/admin/dashBoard",
			"/admin/dashBoard/countUser",
			"/admin/dashBoard/new",
			"/admin/dashBoard/top",
			"/admin/dashBoard/usage",
		]);
	const [auth, todayUsage, newCount, topUsage, usageList] = await Promise.all([
		apiInstance.get<BaseResponse<CountAdminAuthResponseDto>>(
			"/admin/dashBoard",
		),
		apiInstance.get<BaseResponse<CountUsagePersonResponseDto>>(
			"/admin/dashBoard/countUser",
		),
		apiInstance.get<BaseResponse<NewCountAdminResponseDto>>(
			"/admin/dashBoard/new",
		),
		apiInstance.get<BaseResponse<CountUsageResponseDto>>(
			"/admin/dashBoard/top",
		),
		apiInstance.get<BaseResponse<CountUsageListResponseDto>>(
			"/admin/dashBoard/usage",
		),
	]);
	if (__DEV__)
		console.log("[fetchAdminDashboard] 응답:", {
			auth: auth.data.result,
			todayUsage: todayUsage.data.result,
			newCount: newCount.data.result,
			topUsage: topUsage.data.result,
			usageList: usageList.data.result,
		});

	return toAdminDashboardData({
		auth: auth.data.result,
		newCount: newCount.data.result,
		todayUsage: todayUsage.data.result,
		topUsage: topUsage.data.result,
		usageList: usageList.data.result,
	});
}

export function useAdminDashboard() {
	return useQuery({
		queryKey: ["admin", "dashboard"],
		queryFn: fetchAdminDashboard,
	});
}
