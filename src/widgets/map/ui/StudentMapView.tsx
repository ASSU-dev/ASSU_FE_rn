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
import { useSuggestionAdmins } from "@/entities/suggestion";
import {
	AdminChipRow,
	type AdminFilterItem,
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

const PEEK_FRACTION = 0.2;
const HALF_FRACTION = 0.45;
/** 검색바(≈68) + 카테고리 칩 행(≈45) + 여백 — 시트 full이 칩 바로 아래에서 멈추도록 */
const SHEET_TOP_MARGIN_BELOW_INSET = 123;

interface StudentMapViewProps {
	onStorePress?: (store: StoreMarker) => void;
	/** 매장 선택 카드의 "제휴 인증하기" 버튼 탭 */
	onCertifyPress?: (store: StoreMarker) => void;
}

export function StudentMapView({
	onStorePress,
	onCertifyPress,
}: StudentMapViewProps) {
	const kakaoRef = useRef<KakaoMapHandle>(null);
	const sheetRef = useRef<SnapBottomSheetRef>(null);
	const insets = useSafeAreaInsets();
	const { height: windowHeight } = useWindowDimensions();
	const { center, myLocation, heading } = useUserLocation();
	const { storeCategory, adminId, toggleAdminId } = useMapFilterStore();

	// 로그인한 학생 소속(총학/단과대/학부) 학생회만 칩으로 노출
	const { data: suggestionAdmins = [] } = useSuggestionAdmins();
	const admins = useMemo<AdminFilterItem[]>(
		() =>
			suggestionAdmins.map((item) => ({ id: item.value, name: item.label })),
		[suggestionAdmins],
	);

	useEffect(() => {
		if (__DEV__ && admins.length > 0)
			console.log("[StudentMapView] 학생회 칩:", admins);
	}, [admins]);

	const viewport = center ? toViewport(center) : null;
	// 카테고리 필터는 지도 마커에만 적용하고, 시트 리스트는 학생회 필터만 반영한다.
	// 카테고리 미선택 시 두 쿼리 키가 같아 요청은 한 번만 나간다.
	const { data: markerStores = [] } = useNearbyStores(viewport, {
		storeCategory: storeCategory ?? undefined,
		adminId: adminId ?? undefined,
	});
	const { data: listStores = [] } = useNearbyStores(viewport, {
		adminId: adminId ?? undefined,
	});
	const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

	const partnerMarkerStores = useMemo(
		() => markerStores.filter((store) => store.hasPartner),
		[markerStores],
	);
	const partnerListStores = useMemo(
		() => listStores.filter((store) => store.hasPartner),
		[listStores],
	);
	const selectedStore =
		partnerMarkerStores.find((store) => store.id === selectedStoreId) ?? null;

	useEffect(() => {
		if (selectedStoreId && !selectedStore) setSelectedStoreId(null);
	}, [selectedStore, selectedStoreId]);

	const mapMarkers = useMemo<KakaoMapMarker[]>(
		() =>
			partnerMarkerStores.map((store) => ({
				id: store.id,
				name: store.name,
				latitude: store.latitude,
				longitude: store.longitude,
				hasPartner: true,
				category: store.category,
				benefit: getPrimaryBenefit(store),
			})),
		[partnerMarkerStores],
	);

	const snapPoints = useMemo(
		() => [`${PEEK_FRACTION * 100}%`, `${HALF_FRACTION * 100}%`, "100%"],
		[],
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
			<SnapBottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				topInset={insets.top + SHEET_TOP_MARGIN_BELOW_INSET}
			>
				<AdminChipRow
					admins={admins}
					selectedAdminId={adminId}
					onToggleAdmin={toggleAdminId}
				/>
				<BottomSheetFlatList
					data={partnerListStores}
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
