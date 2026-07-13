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
	adminName: string;
	stats: DashboardStats;
	monthlyUsage: MonthlyUsage[];
	insight: InsightData;
}
