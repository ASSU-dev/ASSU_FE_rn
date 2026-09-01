import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StoreMagazineCard } from "@/entities/store/ui/StoreMagazineCard";
import type { CurationStoreDTO } from "@/shared/api";

interface HomeRecommendedSectionProps {
	curationTitle?: string;
	groupTitle?: string;
	stores?: CurationStoreDTO[];
	isLoading?: boolean;
}

export function HomeRecommendedSection({
	curationTitle,
	groupTitle,
	stores,
	isLoading,
}: HomeRecommendedSectionProps) {
	if (isLoading) {
		return (
			<View className="gap-4">
				<View className="mx-screen-m h-6 w-40 rounded-md bg-neutral" />
				<View className="h-[200px] items-center justify-center">
					<ActivityIndicator />
				</View>
			</View>
		);
	}

	if (!stores || stores.length === 0) return null;

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
