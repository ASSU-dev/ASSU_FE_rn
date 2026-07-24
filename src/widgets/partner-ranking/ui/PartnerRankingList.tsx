import { Text, View } from "react-native";
import { PartnerItem } from "@/entities/partner/ui/PartnerItem";
import { useTodayBestStoresQuery } from "@/entities/store/api/useTodayBestStoresQuery";

export const PartnerRankingList = () => {
	const { data: stores = [], isLoading } = useTodayBestStoresQuery();
	const left = stores.filter((_, i) => i % 2 === 0);
	const right = stores.filter((_, i) => i % 2 === 1);
	const isEmpty = !isLoading && stores.length === 0;

	return (
		<View className="bg-canvas p-4 rounded-2xl mb-6">
			<Text className="text-lg font-bold mb-1">Today 제휴 인기 매장</Text>
			<Text className="text-xs text-content-tertiary mb-3">
				오늘 12:00 기준
			</Text>

			{isEmpty ? (
				<Text className="text-sm font-regular text-content-secondary">
					오늘 인기 매장이 아직 없습니다.
				</Text>
			) : (
				<View className="flex-row">
					<View className="flex-1">
						{left.map((item, i) => (
							<PartnerItem key={item.id} rank={i * 2 + 1} name={item.name} />
						))}
					</View>
					<View className="w-px border-l border-black mx-2" />
					<View className="flex-1">
						{right.map((item, i) => (
							<PartnerItem key={item.id} rank={i * 2 + 2} name={item.name} />
						))}
					</View>
				</View>
			)}
		</View>
	);
};
