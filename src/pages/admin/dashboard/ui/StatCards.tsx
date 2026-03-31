// 통계 카드 3개 묶음 — 앱 인증자 / 신규가입자 / 제휴 사용자
import { View } from "react-native";
import type { DashboardStats } from "../model/types";
import { StatCard } from "./StatCard";

interface StatCardsProps {
	stats: DashboardStats;
}

export function StatCards({ stats }: StatCardsProps) {
	return (
		<View className="flex-row gap-gutter">
			<StatCard label="앱 인증자" count={stats.appCertified} />
			<StatCard label="신규가입자" count={stats.newJoined} />
			<StatCard label="제휴 사용자" count={stats.affiliateUsers} />
		</View>
	);
}
