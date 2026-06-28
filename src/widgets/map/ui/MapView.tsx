import { useRef } from "react";
import { View } from "react-native";

import { type MapViewport, useNearbyStores } from "@/features/map-search";
import { KakaoMap, type KakaoMapHandle } from "@/shared/ui/kakao-map";
import { useUserLocation } from "@/widgets/map/model/useUserLocation";

import { MapLocateButton } from "./MapLocateButton";

export function MapView() {
	const kakaoRef = useRef<KakaoMapHandle>(null);
	const { center, myLocation, heading } = useUserLocation();
	const viewport = center ? toViewport(center) : null;
	const { data: nearbyStores = [] } = useNearbyStores(viewport);

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
					markers={nearbyStores}
				/>
			) : null}
			<MapLocateButton
				onPress={handleFocusToMyLocation}
				disabled={!myLocation}
			/>
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
