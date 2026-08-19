import { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";

import type { StoreMarker } from "@/entities/store";
import { type MapViewport, useNearbyStores } from "@/features/map-search";
import { KakaoMap, type KakaoMapHandle } from "@/shared/ui/kakao-map";
import { useUserLocation } from "../model/useUserLocation";

import { MapContactCard } from "./MapContactCard";
import { MapLocateButton } from "./MapLocateButton";
import { MapSelectedStoreCard } from "./MapSelectedStoreCard";

interface MapViewProps {
	partnershipMode?: boolean;
	onStorePress?: (store: StoreMarker) => void;
	/** 마커 선택 시 문의 카드 노출 + 문의하기 콜백 (제휴업체 맵) */
	onContactPress?: (store: StoreMarker) => void;
	isContactPending?: boolean;
}

export function MapView({
	partnershipMode = false,
	onStorePress,
	onContactPress,
	isContactPending = false,
}: MapViewProps) {
	const kakaoRef = useRef<KakaoMapHandle>(null);
	const { center, myLocation, heading } = useUserLocation();
	const viewport = center ? toViewport(center) : null;
	const { data: nearbyStores = [] } = useNearbyStores(viewport);
	const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
	const mapMarkers = useMemo(
		() =>
			partnershipMode
				? nearbyStores.filter((store) => store.hasPartner)
				: nearbyStores,
		[nearbyStores, partnershipMode],
	);
	const selectedStore =
		mapMarkers.find((store) => store.id === selectedStoreId) ?? null;

	useEffect(() => {
		if (selectedStoreId && !selectedStore) setSelectedStoreId(null);
	}, [selectedStore, selectedStoreId]);

	const handleFocusToMyLocation = () => {
		if (!myLocation) return;
		kakaoRef.current?.panTo(myLocation.lat, myLocation.lng);
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
					partnerMarkersEnabled={partnershipMode}
					selectedMarkerId={selectedStoreId}
					onMarkerPress={setSelectedStoreId}
					onMapPress={() => setSelectedStoreId(null)}
				/>
			) : null}
			<MapLocateButton
				onPress={handleFocusToMyLocation}
				disabled={!myLocation}
			/>
			{partnershipMode && selectedStore ? (
				<View className="absolute bottom-[12px] left-[14px] right-[14px]">
					<MapSelectedStoreCard
						store={selectedStore}
						onPress={
							onStorePress ? () => onStorePress(selectedStore) : undefined
						}
					/>
				</View>
			) : null}
			{onContactPress && selectedStore ? (
				<View className="absolute bottom-[12px] left-[14px] right-[14px]">
					<MapContactCard
						store={selectedStore}
						onContactPress={() => onContactPress(selectedStore)}
						isContactPending={isContactPending}
					/>
				</View>
			) : null}
		</View>
	);
}

function toViewport(center: { lat: number; lng: number }): MapViewport {
	const latDelta = 0.01;
	const lngDelta = 0.01;

	return {
		lng1: center.lng - lngDelta,
		lat1: center.lat + latDelta,
		lng2: center.lng + lngDelta,
		lat2: center.lat + latDelta,
		lng3: center.lng + lngDelta,
		lat3: center.lat - latDelta,
		lng4: center.lng - lngDelta,
		lat4: center.lat - latDelta,
	};
}
