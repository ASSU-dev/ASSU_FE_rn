// 관리자 대시보드 목 데이터
import type { DashboardData } from "./types";

export const mockDashboardData: DashboardData = {
	adminName: "숭실대학교 총학생회",
	stats: {
		appCertified: 5010,
		newJoined: 74,
		affiliateUsers: 4128,
	},
	monthlyUsage: [
		{ month: "10월", count: 120 },
		{ month: "11월", count: 95 },
		{ month: "12월", count: 180 },
		{ month: "1월", count: 210 },
		{ month: "2월", count: 150 },
		{ month: "3월", count: 192 },
	],
	insight: {
		topStoreName: "역전할머니맥주 숭실대점",
		expectedCount: 192,
	},
};

export const mockEmptyDashboardData: DashboardData = {
	adminName: "숭실대학교 총학생회",
	stats: {
		appCertified: 0,
		newJoined: 0,
		affiliateUsers: 0,
	},
	monthlyUsage: [],
	insight: {
		topStoreName: "역전할머니맥주 숭실대점",
		expectedCount: 0,
	},
};
