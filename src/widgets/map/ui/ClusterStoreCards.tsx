import { Image, Pressable, ScrollView, Text, View } from "react-native";
import {
	getPrimaryAdminName,
	getPrimaryBenefit,
	type StoreMarker,
} from "@/entities/store";
import { CloseNoCircleIcon } from "@/shared/assets/icons";

const CARD_HEIGHT = 112;
const CARD_GAP = 10;
const MAX_VISIBLE_CARDS = 3;

interface ClusterStoreCardsProps {
	stores: StoreMarker[];
	maxHeight: number;
	bottomOffset: number;
	onSelect: (store: StoreMarker) => void;
	onDismiss: (id: string) => void;
}

/** 최대 3개 높이 안에서 스크롤 가능한 클러스터 매장 카드 목록 */
export function ClusterStoreCards({
	stores,
	maxHeight,
	bottomOffset,
	onSelect,
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
				{stores.map((store, index) => (
					<View key={store.id}>
						{index > 0 && <View className="h-gutter" />}
						<View
							className="flex-row rounded-[10px] border border-neutral-variant bg-canvas"
							style={{ height: CARD_HEIGHT }}
						>
							<Pressable
								className="flex-1 flex-row items-center gap-gutter p-gutter"
								accessibilityRole="button"
								accessibilityLabel={`${store.name} 선택`}
								onPress={() => onSelect(store)}
							>
								{store.imageUri ? (
									<Image
										source={{ uri: store.imageUri }}
										className="h-[64px] w-[64px] rounded-md"
										resizeMode="cover"
									/>
								) : (
									<View className="h-[64px] w-[64px] rounded-md bg-neutral" />
								)}
								<View className="flex-1 gap-[4px]">
									<Text
										className="text-sm font-bold text-content-primary"
										numberOfLines={1}
									>
										{store.name}
									</Text>
									<Text
										className="text-[11px] text-content-secondary"
										numberOfLines={1}
									>
										{getPrimaryAdminName(store)}
									</Text>
									<Text className="text-sm text-primary" numberOfLines={2}>
										{getPrimaryBenefit(store)}
									</Text>
								</View>
							</Pressable>
							<Pressable
								className="h-[44px] w-[44px] items-center justify-center"
								accessibilityRole="button"
								accessibilityLabel={`${store.name} 카드 닫기`}
								onPress={() => onDismiss(store.id)}
							>
								<CloseNoCircleIcon width={9.6} height={9.6} />
							</Pressable>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}
