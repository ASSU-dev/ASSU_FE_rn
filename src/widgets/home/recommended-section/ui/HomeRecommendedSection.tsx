import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { StoreMagazineCard } from "@/entities/store/ui/StoreMagazineCard";
import type { CurationStoreDTO } from "@/shared/api";

interface HomeRecommendedSectionProps {
	curationTitle?: string;
	groupTitle?: string;
	stores?: CurationStoreDTO[];
}

export function HomeRecommendedSection({
	curationTitle,
	groupTitle,
	stores,
}: HomeRecommendedSectionProps) {
	return (
		<View className="gap-4">
			<Text className="px-screen-m font-semibold text-lg text-content-primary">
				{curationTitle} • {groupTitle}
			</Text>
			<FlatList
				data={stores}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => String(item.storeId)}
				contentContainerClassName="px-screen-m"
				ItemSeparatorComponent={() => <View className="w-3" />}
				renderItem={({ item }) => (
					<View style={{ width: 180 }}>
						<StoreMagazineCard
							profileImageUrl={item.profileImageUrl}
							discountContent={item.discountContent}
							storeName={item.storeName}
							onPress={() =>
								router.push(
									`/(protected)/student/store/${item.storeId}/detail?storeName=${encodeURIComponent(item.storeName ?? "")}`,
								)
							}
						/>
					</View>
				)}
			/>
		</View>
	);
}
