import { router } from "expo-router";
import { FlatList, View } from "react-native";
import { DiscountBannerCard } from "@/entities/store/ui/DiscountBannerCard";
import { useGetRecommendCarouselPartnershipQuery } from "@/features/home/api/useGetRecommendCarouselPartnershipQuery";

export function HomeDiscountList() {
	const { data: response } = useGetRecommendCarouselPartnershipQuery();
	const stores = response?.result ?? [];

	if (stores.length === 0) return null;

	return (
		<View>
			<View className="h-3 bg-neutral" />
			<FlatList
				data={stores}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => `${item.storeId ?? index}-${index}`}
				contentContainerClassName="px-5 pt-3 pb-4"
				ItemSeparatorComponent={() => <View className="w-4" />}
				renderItem={({ item }) => {
					const storeId = item.storeId;
					return (
						<DiscountBannerCard
							badge={item.belonging}
							storeName={item.partnerName ?? ""}
							imageUri={item.partnerProfileUrl ?? undefined}
							onPress={
								storeId !== undefined
									? () =>
											router.push(
												`/(protected)/student/store/${storeId}/detail?storeName=${encodeURIComponent(item.partnerName ?? "")}`,
											)
									: undefined
							}
						/>
					);
				}}
			/>
			<View className="h-3 bg-neutral" />
		</View>
	);
}
