import { router } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import {
	logStoreSelect,
	STORE_LIST,
	toStoreAnalyticsItems,
} from "@/entities/store";
import { AdBannerCard } from "@/entities/store/ui/AdBannerCard";
import { useGetRecommendCarouselPartnershipQuery } from "@/features/home/api/useGetRecommendCarouselPartnershipQuery";
import { useViewItemListTracking } from "@/shared/lib/analytics";

type AdStore = { storeId?: number; partnerName?: string | null };

const toAdAnalyticsSource = (store: AdStore) => ({
	storeId: store.storeId,
	storeName: store.partnerName,
});

export function HomeAdList() {
	const { data: response, isLoading } =
		useGetRecommendCarouselPartnershipQuery();
	const stores = response?.result ?? [];

	const analyticsItems = useMemo(
		() => toStoreAnalyticsItems(response?.result ?? [], toAdAnalyticsSource),
		[response],
	);
	useViewItemListTracking({
		list: STORE_LIST.homeAd,
		items: analyticsItems,
		ready: !isLoading,
	});

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
				renderItem={({ item, index }) => {
					const storeId = item.storeId;
					return (
						<AdBannerCard
							badge={item.belonging}
							storeName={item.partnerName ?? ""}
							imageUri={item.partnerProfileUrl ?? undefined}
							onPress={
								storeId !== undefined
									? () => {
											logStoreSelect(
												STORE_LIST.homeAd,
												toAdAnalyticsSource(item),
												index,
											);
											router.push(
												`/(protected)/student/store/${storeId}/detail?storeName=${encodeURIComponent(item.partnerName ?? "")}&source=${STORE_LIST.homeAd.id}`,
											);
										}
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
