import { router } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import {
	logStoreSelect,
	STORE_LIST,
	toStoreAnalyticsItems,
} from "@/entities/store";
import { CurationStoreCard } from "@/entities/store/ui/CurationStoreCard";
import type { CurationStoreDTO } from "@/shared/api";
import { useViewItemListTracking } from "@/shared/lib/analytics";

const toCurationAnalyticsSource = (store: CurationStoreDTO) => ({
	storeId: store.storeId,
	storeName: store.storeName,
	category: store.storeCategory,
});

interface HomeCurationSectionProps {
	curationTitle?: string;
	groupTitle?: string;
	stores?: CurationStoreDTO[];
	isLoading?: boolean;
}

export function HomeCurationSection({
	curationTitle,
	groupTitle,
	stores,
	isLoading,
}: HomeCurationSectionProps) {
	const analyticsItems = useMemo(
		() => toStoreAnalyticsItems(stores ?? [], toCurationAnalyticsSource),
		[stores],
	);
	useViewItemListTracking({
		list: STORE_LIST.homeCuration,
		items: analyticsItems,
		ready: !isLoading,
	});

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
				renderItem={({ item, index }) => (
					<View style={{ width: 180 }}>
						<CurationStoreCard
							profileImageUrl={item.profileImageUrl}
							discountContent={item.discountContent}
							storeName={item.storeName}
							onPress={() => {
								logStoreSelect(
									STORE_LIST.homeCuration,
									toCurationAnalyticsSource(item),
									index,
								);
								router.push(
									`/(protected)/student/store/${item.storeId}/detail?storeName=${encodeURIComponent(item.storeName ?? "")}&source=${STORE_LIST.homeCuration.id}`,
								);
							}}
						/>
					</View>
				)}
			/>
		</View>
	);
}
