import { Text, View } from "react-native";
import { PartnerItem } from "@/entities/partner/ui/PartnerItem";

const MOCK_PARTNERS = [
	{ storeId: 1, storeName: "역전할머니맥주" },
	{ storeId: 2, storeName: "취향" },
	{ storeId: 3, storeName: "Bread & co" },
	{ storeId: 4, storeName: "인쌩맥주" },
	{ storeId: 5, storeName: "역전할머니맥주" },
	{ storeId: 6, storeName: "취향" },
	{ storeId: 7, storeName: "Bread & co" },
	{ storeId: 8, storeName: "인쌩맥주" },
];

export const PartnerRankingList = () => {
	const left = MOCK_PARTNERS.filter((_, i) => i % 2 === 0);
	const right = MOCK_PARTNERS.filter((_, i) => i % 2 === 1);

	return (
		<View className="bg-canvas p-4 rounded-2xl mb-6">
			<Text className="text-lg font-bold mb-1">🔥 Today 제휴 인기 매장</Text>
			<Text className="text-xs text-content-tertiary mb-3">
				오늘 12:00 기준
			</Text>

			<View className="flex-row">
				<View className="flex-1">
					{left.map((item, i) => (
						<PartnerItem
							key={item.storeId}
							rank={i * 2 + 1}
							name={item.storeName}
						/>
					))}
				</View>

				<View className="w-px border-l border-content-primary mx-2" />

				<View className="flex-1">
					{right.map((item, i) => (
						<PartnerItem
							key={item.storeId}
							rank={i * 2 + 2}
							name={item.storeName}
						/>
					))}
				</View>
			</View>
		</View>
	);
};
