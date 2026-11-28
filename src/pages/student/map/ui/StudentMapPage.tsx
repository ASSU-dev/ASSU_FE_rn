import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryChipRow, useMapFilterStore } from "@/features/map-filter";
import { trackEvent } from "@/shared/lib/analytics/trackEvent";
import { MapSearchBar, StudentMapView } from "@/widgets/map";

/** MapSearchBar(insets.top + 12 + 44 + 12) 바로 아래 */
const CHIP_ROW_TOP_OFFSET = 70;

export function StudentMapPage() {
	const insets = useSafeAreaInsets();
	const { height: windowHeight } = useWindowDimensions();
	const sheetPosition = useSharedValue(windowHeight);
	const [isSheetExpanded, setIsSheetExpanded] = useState(false);
	const [categoryRowHeight, setCategoryRowHeight] = useState(45);
	const headerHeight = insets.top + CHIP_ROW_TOP_OFFSET + categoryRowHeight + 8;
	const headerBackgroundStyle = useAnimatedStyle(() => ({
		opacity: 1 - Math.min(1, Math.max(0, sheetPosition.value / headerHeight)),
	}));
	const { storeCategory, toggleStoreCategory } = useMapFilterStore();
	const {
		preSelectStoreId,
		preSelectLat,
		preSelectLng,
		preSelectName,
		preSelectImageUri,
		preSelectBenefit,
		preSelectTag,
		preSelectRequestId,
	} = useLocalSearchParams<{
		preSelectStoreId?: string;
		preSelectLat?: string;
		preSelectLng?: string;
		preSelectName?: string;
		preSelectImageUri?: string;
		preSelectBenefit?: string;
		preSelectTag?: string;
		preSelectRequestId?: string;
	}>();

	const pinnedStoreId = preSelectStoreId ? Number(preSelectStoreId) : undefined;

	// 일반 카드와 고정 카드는 같은 카드·같은 이동이라 진입 경로를 map_card 하나로 기록한다.
	const handleCertify = (storeId: string | number) => {
		const numericStoreId = Number(storeId);
		trackEvent("partnership_started", {
			entry_point: "map_card",
			store_id: Number.isFinite(numericStoreId) ? numericStoreId : undefined,
		});
		router.push({
			pathname: "/(protected)/student/partnership-benefit-select",
			params: { storeId, entryPoint: "map_card" },
		});
	};

	return (
		<View className="flex-1 bg-canvas">
			<StudentMapView
				sheetPosition={sheetPosition}
				headerHeight={headerHeight}
				isSheetExpanded={isSheetExpanded}
				onSheetExpandedChange={setIsSheetExpanded}
				onStorePress={(store) =>
					router.push({
						pathname: "/(protected)/student/store/[storeId]/detail",
						params: { storeId: store.id, storeName: store.name },
					})
				}
				onCertifyPress={(store) => handleCertify(store.id)}
				initialStoreId={preSelectStoreId}
				initialLat={preSelectLat ? Number(preSelectLat) : undefined}
				initialLng={preSelectLng ? Number(preSelectLng) : undefined}
				initialStoreName={preSelectName}
				initialStoreImageUri={preSelectImageUri}
				initialStoreBenefit={preSelectBenefit}
				initialStoreTag={preSelectTag}
				initialSelectionKey={preSelectRequestId}
				onPinnedStorePress={
					pinnedStoreId
						? () =>
								router.push({
									pathname: "/(protected)/student/store/[storeId]/detail",
									params: { storeId: pinnedStoreId, storeName: preSelectName },
								})
						: undefined
				}
				onPinnedStoreCertifyPress={
					pinnedStoreId ? () => handleCertify(pinnedStoreId) : undefined
				}
			/>
			<Animated.View
				pointerEvents="none"
				className="absolute left-0 right-0 top-0 bg-canvas"
				style={[{ height: headerHeight }, headerBackgroundStyle]}
			/>
			<MapSearchBar
				withShadow={!isSheetExpanded}
				placeholder="다양한 제휴매장을 검색해보세요"
				onPress={() => router.push("/(protected)/student/map-search")}
			/>
			<View
				className="absolute left-0 right-0"
				style={{ top: insets.top + CHIP_ROW_TOP_OFFSET }}
				onLayout={(event) =>
					setCategoryRowHeight(event.nativeEvent.layout.height)
				}
			>
				<CategoryChipRow
					withShadow={!isSheetExpanded}
					selectedCategory={storeCategory}
					onToggleCategory={toggleStoreCategory}
				/>
			</View>
		</View>
	);
}
