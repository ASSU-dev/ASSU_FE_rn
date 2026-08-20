import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
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

const ENDPOINTS = {
	auth: "/admin/dashBoard",
	todayUsage: "/admin/dashBoard/countUser",
	newCount: "/admin/dashBoard/new",
	topUsage: "/admin/dashBoard/top",
	usageList: "/admin/dashBoard/usage",
} as const;

/**
 * 개별 대시보드 엔드포인트 호출.
 * 데이터가 없을 때 404 등으로 실패하는 엔드포인트가 있어도 나머지 지표는 보여줘야 하므로
 * 실패 시 null을 반환하고 호출부에서 기본값으로 대체한다.
 */
async function fetchOrNull<T>(url: string): Promise<T | null> {
	try {
		const res = await apiInstance.get<BaseResponse<T | null>>(url);
		return res.data.result ?? null;
	} catch (error) {
		if (__DEV__) {
			const status = isAxiosError(error) ? error.response?.status : undefined;
			const body = isAxiosError(error)
				? (error.response?.data as { code?: string; message?: string })
				: undefined;
			// 데이터 없음(404)은 정상 케이스이므로 한 줄 info 로그만 남긴다.
			console.log(
				"[fetchAdminDashboard] 응답 없음:",
				url,
				status ?? "",
				body?.code ?? "",
				body?.message ?? String(error),
			);
		}
		return null;
	}
}

async function fetchAdminDashboard(): Promise<DashboardData> {
	if (__DEV__)
		console.log("[fetchAdminDashboard] 요청:", Object.values(ENDPOINTS));

	const [auth, todayUsage, newCount, topUsage, usageList] = await Promise.all([
		fetchOrNull<CountAdminAuthResponseDto>(ENDPOINTS.auth),
		fetchOrNull<CountUsagePersonResponseDto>(ENDPOINTS.todayUsage),
		fetchOrNull<NewCountAdminResponseDto>(ENDPOINTS.newCount),
		fetchOrNull<CountUsageResponseDto>(ENDPOINTS.topUsage),
		fetchOrNull<CountUsageListResponseDto>(ENDPOINTS.usageList),
	]);

	if (__DEV__)
		console.log("[fetchAdminDashboard] 응답:", {
			auth,
			todayUsage,
			newCount,
			topUsage,
			usageList,
		});

	// 전부 실패한 경우에만 에러로 처리
	if (!auth && !todayUsage && !newCount && !topUsage && !usageList) {
		throw new Error("대시보드 정보를 불러오지 못했어요");
	}

	return toAdminDashboardData({
		auth,
		newCount,
		todayUsage,
		topUsage,
		usageList,
	});
}

export function useAdminDashboard() {
	return useQuery({
		queryKey: ["admin", "dashboard"],
		queryFn: fetchAdminDashboard,
	});
}
