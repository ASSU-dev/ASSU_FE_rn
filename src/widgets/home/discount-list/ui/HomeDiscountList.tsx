import { router } from "expo-router";
import { FlatList, View } from "react-native";
import { DiscountBannerCard } from "@/entities/store/ui/DiscountBannerCard";

interface DiscountStore {
	id: string;
	badge: string;
	storeName: string;
	imageUri?: string;
}

const MOCK_STORES: DiscountStore[] = Array.from({ length: 6 }, (_, i) => ({
	id: String(i + 1),
	badge: "50% 할인",
	storeName: "어떠고 매장",
}));

export function HomeDiscountList() {
	return (
		<View>
			<View className="h-3 bg-neutral" />
			<FlatList
				data={MOCK_STORES}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				contentContainerClassName="px-5 pt-3 pb-4"
				ItemSeparatorComponent={() => <View className="w-4" />}
				renderItem={({ item }) => (
					<DiscountBannerCard
						badge={item.badge}
						storeName={item.storeName}
						imageUri={item.imageUri}
						onPress={() =>
							router.push(
								`/(protected)/student/store/${item.id}/detail?storeName=${encodeURIComponent(item.storeName)}`,
							)
						}
					/>
				)}
			/>
			<View className="h-3 bg-neutral" />
		</View>
	);
}
