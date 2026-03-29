// 제휴 이용현황 섹션: 섹션 타이틀 + 바 차트 + 인사이트 카드

import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { InsightData, MonthlyUsage } from "../model/types";

interface BarChartProps {
	data: MonthlyUsage[];
}

function SimpleBarChart({ data }: BarChartProps) {
	const maxCount = Math.max(...data.map((d) => d.count), 1);
	const BAR_HEIGHT = 120;

	return (
		<View className="bg-neutral rounded-[10px] px-gutter pt-[20px] pb-[10px]">
			<View
				className="flex-row items-end justify-between"
				style={{ height: BAR_HEIGHT + 24 }}
			>
				{data.map((item) => {
					const barH = Math.max((item.count / maxCount) * BAR_HEIGHT, 4);
					return (
						<View key={item.month} className="flex-1 items-center gap-[6px]">
							<View
								className="w-[18px] rounded-t-[4px]"
								style={{ height: barH, backgroundColor: colorTokens.primary }}
							/>
							<Text className="text-[10px] font-regular text-content-secondary">
								{item.month}
							</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
}

interface UsageSectionProps {
	monthlyUsage: MonthlyUsage[];
	insight: InsightData;
	devToggle?: ReactNode;
}

export function UsageSection({
	monthlyUsage,
	insight,
	devToggle,
}: UsageSectionProps) {
	const hasData = monthlyUsage.length > 0;

	return (
		<View className="gap-[25px]">
			<View className="flex-row items-center gap-[8px]">
				<Text className="text-md font-medium text-content-primary leading-body">
					제휴 이용현황
				</Text>
				{devToggle}
			</View>

			{hasData && <SimpleBarChart data={monthlyUsage} />}

			<View className="bg-neutral rounded-[8px] py-gutter px-card-p gap-card-p items-center">
				<View className="items-center gap-[4px]">
					{insight.topStoreName && (
						<Text className="text-md font-medium text-content-primary leading-body tracking-body text-center">
							"{insight.topStoreName}" 의
						</Text>
					)}
					<Text className="text-md font-medium text-content-primary leading-body tracking-body text-center">
						{hasData
							? "제휴 누적이용률이 가장 높아요!"
							: "제휴 이용 내역이 없어요"}
					</Text>
				</View>
				<Text className="text-[12px] font-regular text-content-secondary leading-caption tracking-caption text-center">
					이번달에는{" "}
					<Text className="font-semibold text-primary">
						{insight.expectedCount}
					</Text>
					명 이용할 것으로 예상돼요
				</Text>
			</View>
		</View>
	);
}
