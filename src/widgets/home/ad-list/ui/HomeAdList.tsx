import { router } from "expo-router";
import { ActivityIndicator, FlatList, View } from "react-native";
import { AdBannerCard } from "@/entities/store/ui/AdBannerCard";
import { useGetRecommendCarouselPartnershipQuery } from "@/features/home/api/useGetRecommendCarouselPartnershipQuery";

export function HomeAdList() {
	const { data: response, isLoading } =
		useGetRecommendCarouselPartnershipQuery();
	const stores = response?.result ?? [];

	if (isLoading && stores.length === 0) {
		return (
			<View>
				<View className="h-3 bg-neutral" />
				<View className="h-[120px] items-center justify-center">
					<ActivityIndicator />
				</View>
				<View className="h-3 bg-neutral" />
			</View>
		);
	}

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
						<AdBannerCard
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
