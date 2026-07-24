import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { usePartnerWeeklyRanking } from "@/features/partner-weekly-ranking";

export function PartnerDashboardPage() {
	const {
		data: weeklyRanks = [],
		isLoading,
		isError,
		error,
	} = usePartnerWeeklyRanking();
	const maxUsageCount = Math.max(
		...weeklyRanks.map((item) => item.usageCount),
		1,
	);

	return (
		<View className="flex-1 bg-canvas px-screen-m pt-screen-m gap-screen-m">
			<View className="gap-2">
				<Text className="text-xl font-semibold text-content-primary leading-heading">
					업체 대시보드
				</Text>
				<Text className="text-sm text-content-secondary">
					최근 6주 내 가게 순위와 이용 수를 확인해보세요
				</Text>
			</View>

			<View className="bg-neutral rounded-md p-card-p gap-card-p">
				<Text className="text-md font-medium text-content-primary">
					주간 순위
				</Text>
				{isLoading ? (
					<View className="items-center py-screen-m">
						<ActivityIndicator />
					</View>
				) : isError ? (
					<Text className="text-sm text-danger">{String(error)}</Text>
				) : weeklyRanks.length === 0 ? (
					<Text className="text-sm text-content-secondary">
						아직 순위 데이터가 없어요
					</Text>
				) : (
					<View className="gap-gutter">
						{weeklyRanks.map((item) => (
							<View key={item.weekLabel} className="gap-gutter">
								<View className="flex-row items-center justify-between">
									<Text className="text-sm text-content-primary">
										{item.weekLabel}
									</Text>
									<Text className="text-sm text-content-secondary">
										{item.rank}위 · {item.usageCount}건
									</Text>
								</View>
								<View className="h-2 rounded-full bg-neutral-variant overflow-hidden">
									<View
										className="h-full rounded-full bg-primary"
										style={{
											width: `${Math.max((item.usageCount / maxUsageCount) * 100, 5)}%`,
										}}
									/>
								</View>
							</View>
						))}
					</View>
				)}
			</View>

			<Pressable
				onPress={() => router.push("/(protected)/partner/review")}
				className="bg-primary px-screen-m py-card-p rounded-md items-center"
			>
				<Text className="text-content-inverse font-semibold text-md">
					제휴 리뷰 보러가기
				</Text>
			</Pressable>
		</View>
	);
}
