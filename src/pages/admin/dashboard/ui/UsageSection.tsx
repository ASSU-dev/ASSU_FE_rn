// 제휴 이용현황 섹션: 섹션 타이틀 + 막대 차트 + 인사이트 카드

import type { ReactNode } from "react";
import { Text, View } from "react-native";
import type { InsightData, UsageBar } from "../model/types";

const CHART_HEIGHT = 158;
const LABEL_HEIGHT = 32; // 값 라벨(최대 2줄) 영역
const BAR_MAX_HEIGHT = CHART_HEIGHT - LABEL_HEIGHT - 4;
const BAR_MIN_HEIGHT = 10;

interface ChartBar extends UsageBar {
	highlighted?: boolean;
}

function UsageBarChart({ bars }: { bars: ChartBar[] }) {
	const maxCount = Math.max(...bars.map((bar) => bar.count), 1);

	return (
		<View
			className="w-[310px] flex-row items-end justify-between self-center"
			style={{ height: CHART_HEIGHT }}
		>
			{bars.map((bar, index) => {
				const barHeight = Math.max(
					(bar.count / maxCount) * BAR_MAX_HEIGHT,
					BAR_MIN_HEIGHT,
				);
				const key = `${bar.label}-${index}`;
				return (
					<View key={key} className="items-center gap-[4px]">
						<View className="items-center">
							<Text
								className={`text-[11px] leading-caption tracking-caption ${
									bar.highlighted
										? "font-semibold text-primary"
										: "font-regular text-content-secondary"
								}`}
							>
								{bar.count.toLocaleString()}
							</Text>
							{bar.highlighted ? (
								<Text className="text-[11px] font-semibold leading-[13px] tracking-caption text-primary">
									예상
								</Text>
							) : null}
						</View>
						<View
							className={`w-[34px] rounded-full ${
								bar.highlighted ? "bg-primary" : "bg-neutral"
							}`}
							style={{ height: barHeight }}
						/>
					</View>
				);
			})}
		</View>
	);
}

interface UsageSectionProps {
	usageBars: UsageBar[];
	insight: InsightData;
	devToggle?: ReactNode;
}

export function UsageSection({
	usageBars,
	insight,
	devToggle,
}: UsageSectionProps) {
	const hasData = usageBars.length > 0;
	const chartBars: ChartBar[] = hasData
		? [
				...usageBars,
				{ label: "예상", count: insight.expectedCount, highlighted: true },
			]
		: [];

	return (
		<View className="gap-[25px]">
			<View className="flex-row items-center gap-[8px] px-[7px]">
				<Text className="text-md font-medium leading-[1.3] text-content-primary">
					제휴 이용현황
				</Text>
				{devToggle}
			</View>

			{hasData && <UsageBarChart bars={chartBars} />}

			<View className="bg-neutral rounded-[8px] py-[10px] gap-[15px] items-center">
				<View className="items-center gap-[4px]">
					{insight.topStoreName && (
						<Text className="text-md font-medium leading-[1.3] text-content-primary text-center">
							"{insight.topStoreName}" 의
						</Text>
					)}
					<Text className="text-md font-medium leading-[1.3] text-content-primary text-center">
						{hasData
							? "제휴 누적이용률이 가장 높아요!"
							: "제휴 이용 내역이 없어요"}
					</Text>
				</View>
				<Text className="text-[12px] font-regular leading-[1.3] tracking-[0.024px] text-content-secondary text-center">
					이번달에는{" "}
					<Text className="text-primary">
						{insight.expectedCount.toLocaleString()}
					</Text>
					명 이용할 것으로 예상돼요
				</Text>
			</View>
		</View>
	);
}
