import { useRef } from "react";
import { View } from "react-native";

import { KakaoMap, type KakaoMapHandle } from "@/shared/ui/kakao-map";
import { useUserLocation } from "@/widgets/map/model/useUserLocation";

import { MapLocateButton } from "./MapLocateButton";

export function MapView() {
	const kakaoRef = useRef<KakaoMapHandle>(null);
	const { center, myLocation, heading } = useUserLocation();

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
				/>
			) : null}
			<MapLocateButton
				onPress={handleFocusToMyLocation}
				disabled={!myLocation}
			/>
		</View>
	);
}
