import { ScrollView, View } from "react-native";
import {
	countExtraBenefits,
	formatDistance,
	getDistanceKm,
	getPrimaryAdminName,
	getPrimaryBenefit,
	type StoreMarker,
	splitBenefitText,
} from "@/entities/store";
import type { LatLng } from "@/shared/types/map";
import { StudentSelectedStoreCard } from "./StudentSelectedStoreCard";

// 단일 카드 높이: 썸네일 110 + 위아래 여백 20
const CARD_HEIGHT = 130;
const CARD_GAP = 10;
const MAX_VISIBLE_CARDS = 3;

interface ClusterStoreCardsProps {
	stores: StoreMarker[];
	myLocation: LatLng | null;
	maxHeight: number;
	bottomOffset: number;
	onStorePress?: (store: StoreMarker) => void;
	onCertifyPress?: (store: StoreMarker) => void;
	onDismiss: (id: string) => void;
}

/** 단일 매장 카드를 최대 3개 높이 안에서 스크롤로 표시함 */
export function ClusterStoreCards({
	stores,
	myLocation,
	maxHeight,
	bottomOffset,
	onStorePress,
	onCertifyPress,
	onDismiss,
}: ClusterStoreCardsProps) {
	const visibleCount = Math.min(stores.length, MAX_VISIBLE_CARDS);
	if (visibleCount === 0 || maxHeight <= 0) return null;
	const height = Math.min(
		visibleCount * CARD_HEIGHT + (visibleCount - 1) * CARD_GAP,
		maxHeight,
	);

	return (
		<View
			className="absolute left-card-p right-card-p"
			style={{ bottom: bottomOffset, height }}
		>
			<ScrollView
				style={{ flex: 1 }}
				nestedScrollEnabled
				directionalLockEnabled
				showsVerticalScrollIndicator
				accessibilityLabel="선택한 위치의 매장 목록"
			>
				{stores.map((store, index) => {
					const benefit = splitBenefitText(getPrimaryBenefit(store));
					const distanceText = myLocation
						? formatDistance(
								getDistanceKm(myLocation, {
									lat: store.latitude,
									lng: store.longitude,
								}),
							)
						: undefined;

					return (
						<View key={store.id}>
							{index > 0 && <View className="h-gutter" />}
							<StudentSelectedStoreCard
								name={store.name}
								imageUri={store.imageUri}
								benefitLabel={benefit.label}
								benefitHighlight={benefit.highlight}
								extraBenefitCount={countExtraBenefits(store)}
								distanceText={distanceText}
								tag={getPrimaryAdminName(store)}
								onPress={onStorePress ? () => onStorePress(store) : undefined}
								onCertifyPress={() => onCertifyPress?.(store)}
								onClose={() => onDismiss(store.id)}
							/>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}
