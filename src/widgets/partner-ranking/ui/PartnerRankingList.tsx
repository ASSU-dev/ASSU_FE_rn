import { Text, View } from "react-native";
import { PartnerItem } from "@/entities/partner/ui/PartnerItem";
import { useTodayBestStoresQuery } from "@/entities/store/api/useTodayBestStoresQuery";

const DUMMY_STORES = [
	{ id: "dummy-1", name: "역전할머니맥주" },
	{ id: "dummy-2", name: "취향" },
	{ id: "dummy-3", name: "Bread & co" },
	{ id: "dummy-4", name: "인쌩맥주" },
	{ id: "dummy-5", name: "설쌈냉면" },
	{ id: "dummy-6", name: "지지고" },
	{ id: "dummy-7", name: "블루힐" },
	{ id: "dummy-8", name: "밀플랜비" },
];

export const PartnerRankingList = () => {
	const { data: stores = [] } = useTodayBestStoresQuery();
	const displayStores = stores.length > 0 ? stores : DUMMY_STORES;
	const halfLength = Math.ceil(displayStores.length / 2);
	const left = displayStores.slice(0, halfLength);
	const right = displayStores.slice(halfLength);

	return (
		<View className="bg-canvas p-4 rounded-2xl border border-neutral-variant mb-6">
			<Text className="text-lg font-bold mb-1">Today 제휴 인기 매장</Text>
			<Text className="text-xs text-content-tertiary font-regular mb-3">
				오늘 12:00 기준
			</Text>

			<View className="flex-row gap-gutter">
				<View className="flex-1">
					{left.map((item, i) => (
						<PartnerItem key={item.id} rank={i + 1} name={item.name} />
					))}
				</View>
				<View className="flex-1">
					{right.map((item, i) => (
						<PartnerItem
							key={item.id}
							rank={halfLength + i + 1}
							name={item.name}
						/>
					))}
				</View>
			</View>
		</View>
	);
};
