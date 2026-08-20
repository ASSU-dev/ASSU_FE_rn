export interface DashboardStats {
	appCertified: number;
	newJoined: number;
	affiliateUsers: number;
}

/** 이용현황 차트의 막대 하나 (label: 가게명, count: 누적 이용 수) */
export interface UsageBar {
	label: string;
	count: number;
}

export interface InsightData {
	topStoreName: string | null;
	expectedCount: number;
}

export interface DashboardData {
	adminName: string;
	stats: DashboardStats;
	usageBars: UsageBar[];
	insight: InsightData;
}
