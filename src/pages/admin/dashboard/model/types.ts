// 관리자 대시보드 타입 정의

export interface DashboardStats {
	appCertified: number;
	newJoined: number;
	affiliateUsers: number;
}

export interface MonthlyUsage {
	month: string;
	count: number;
}

export interface InsightData {
	topStoreName: string | null;
	expectedCount: number;
}

export interface DashboardData {
	stats: DashboardStats;
	monthlyUsage: MonthlyUsage[];
	insight: InsightData;
}
