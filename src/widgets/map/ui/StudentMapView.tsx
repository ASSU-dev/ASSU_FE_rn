import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { StoreMarker } from "@/entities/store";
import {
	countExtraBenefits,
	formatDistance,
	getDistanceKm,
	getPrimaryAdminName,
	getPrimaryBenefit,
	StoreListCard,
	splitBenefitText,
} from "@/entities/store";
import {
	AdminChipRow,
	type AdminFilterItem,
	SortChip,
	useMapFilterStore,
} from "@/features/map-filter";
import { useNearbyStores } from "@/features/map-search";
import {
	BottomSheetFlatList,
	SnapBottomSheet,
	type SnapBottomSheetRef,
} from "@/shared/ui/bottom-sheet";
import {
	KakaoMap,
	type KakaoMapHandle,
	type KakaoMapMarker,
} from "@/shared/ui/kakao-map";
import { toViewport } from "../model/toViewport";
import { useUserLocation } from "../model/useUserLocation";
import { MapLocateButton } from "./MapLocateButton";
import { StudentSelectedStoreCard } from "./StudentSelectedStoreCard";

/** peek / half / full — 피그마 지도1·중간·완전 슬라이드 3상태 */
const SNAP_POINTS = ["20%", "45%", "88%"];
const PEEK_FRACTION = 0.2;

interface StudentMapViewProps {
	/** 학생회 필터 칩 목록 — API 확정 전까지 상위에서 주입 */
	admins?: AdminFilterItem[];
	onStorePress?: (store: StoreMarker) => void;
	/** 매장 선택 카드의 "제휴 인증하기" 버튼 탭 */
	onCertifyPress?: (store: StoreMarker) => void;
}

export function StudentMapView({
	admins = [],
	onStorePress,
	onCertifyPress,
}: StudentMapViewProps) {
	const kakaoRef = useRef<KakaoMapHandle>(null);
	const sheetRef = useRef<SnapBottomSheetRef>(null);
	const insets = useSafeAreaInsets();
	const { height: windowHeight } = useWindowDimensions();
	const { center, myLocation, heading } = useUserLocation();
	const { storeCategory, adminId, sortType, toggleAdminId, setSortType } =
		useMapFilterStore();

	const viewport = center ? toViewport(center) : null;
	const { data: nearbyStores = [] } = useNearbyStores(viewport, {
		storeCategory: storeCategory ?? undefined,
		adminId: adminId ?? undefined,
	});
	const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

	const partnerStores = useMemo(
		() => nearbyStores.filter((store) => store.hasPartner),
		[nearbyStores],
	);
	const sortedStores = useMemo(() => {
		if (sortType !== "distance" || !myLocation) return partnerStores;
		return [...partnerStores].sort(
			(a, b) =>
				getDistanceKm(myLocation, { lat: a.latitude, lng: a.longitude }) -
				getDistanceKm(myLocation, { lat: b.latitude, lng: b.longitude }),
		);
	}, [partnerStores, sortType, myLocation]);
	const selectedStore =
		partnerStores.find((store) => store.id === selectedStoreId) ?? null;

	useEffect(() => {
		if (selectedStoreId && !selectedStore) setSelectedStoreId(null);
	}, [selectedStore, selectedStoreId]);

	const mapMarkers = useMemo<KakaoMapMarker[]>(
		() =>
			partnerStores.map((store) => ({
				id: store.id,
				name: store.name,
				latitude: store.latitude,
				longitude: store.longitude,
				hasPartner: true,
				category: store.category,
				benefit: getPrimaryBenefit(store),
			})),
		[partnerStores],
	);

	const handleFocusToMyLocation = () => {
		if (!myLocation) return;
		kakaoRef.current?.panTo(myLocation.lat, myLocation.lng);
	};

	// 마커 선택 시 시트를 peek로 내려 플로팅 카드 공간을 확보한다
	const handleMarkerPress = (markerId: string) => {
		setSelectedStoreId(markerId);
		sheetRef.current?.snapToIndex(0);
	};

	const renderStoreCard = (store: StoreMarker) => {
		const benefit = splitBenefitText(getPrimaryBenefit(store));
		const distanceKm = myLocation
			? getDistanceKm(myLocation, {
					lat: store.latitude,
					lng: store.longitude,
				})
			: null;

		return (
			<StoreListCard
				name={store.name}
				imageUri={store.imageUri}
				benefitLabel={benefit.label}
				benefitHighlight={benefit.highlight}
				extraBenefitCount={countExtraBenefits(store)}
				distanceText={
					distanceKm !== null ? formatDistance(distanceKm) : undefined
				}
				tag={getPrimaryAdminName(store)}
				onPress={onStorePress ? () => onStorePress(store) : undefined}
			/>
		);
	};

	return (
		<View className="flex-1 bg-canvas">
			{center ? (
				<KakaoMap
					ref={kakaoRef}
					initialCenter={center}
					myLocation={myLocation}
					heading={heading}
					markers={mapMarkers}
					categoryMarkersEnabled
					clusteringEnabled
					selectedMarkerId={selectedStoreId}
					onMarkerPress={handleMarkerPress}
					onMapPress={() => setSelectedStoreId(null)}
				/>
			) : null}
			<MapLocateButton
				onPress={handleFocusToMyLocation}
				disabled={!myLocation}
				placement="bottom-left"
				bottomOffset={windowHeight * PEEK_FRACTION + 12}
			/>
			{selectedStore ? (
				<View
					className="absolute left-card-p right-card-p"
					style={{ bottom: windowHeight * PEEK_FRACTION + 12 }}
				>
					<StudentSelectedStoreCard
						name={selectedStore.name}
						imageUri={selectedStore.imageUri}
						benefitLabel={
							splitBenefitText(getPrimaryBenefit(selectedStore)).label
						}
						benefitHighlight={
							splitBenefitText(getPrimaryBenefit(selectedStore)).highlight
						}
						extraBenefitCount={countExtraBenefits(selectedStore)}
						distanceText={
							myLocation
								? formatDistance(
										getDistanceKm(myLocation, {
											lat: selectedStore.latitude,
											lng: selectedStore.longitude,
										}),
									)
								: undefined
						}
						tag={getPrimaryAdminName(selectedStore)}
						onPress={
							onStorePress ? () => onStorePress(selectedStore) : undefined
						}
						onCertifyPress={
							onCertifyPress ? () => onCertifyPress(selectedStore) : () => {}
						}
					/>
				</View>
			) : null}
			<SnapBottomSheet ref={sheetRef} snapPoints={SNAP_POINTS}>
				<AdminChipRow
					admins={admins}
					selectedAdminId={adminId}
					onToggleAdmin={toggleAdminId}
					leading={<SortChip value={sortType} onChange={setSortType} />}
				/>
				<BottomSheetFlatList
					data={sortedStores}
					keyExtractor={(store) => store.id}
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingTop: 10,
						paddingBottom: insets.bottom + 24,
					}}
					ItemSeparatorComponent={StoreListSeparator}
					renderItem={({ item }) => renderStoreCard(item)}
				/>
			</SnapBottomSheet>
		</View>
	);
}

function StoreListSeparator() {
	return <View className="mx-[12px] h-[1px] bg-neutral" />;
}
