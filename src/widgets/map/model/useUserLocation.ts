import * as Location from "expo-location";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

const SOONGSIL = { lat: 37.4963, lng: 126.9572 };
const HEADING_THRESHOLD_DEG = 5;

type LatLng = { lat: number; lng: number };

export function useUserLocation() {
	const [center, setCenter] = useState<LatLng | null>(null);
	const [myLocation, setMyLocation] = useState<LatLng | null>(null);
	const [heading, setHeading] = useState<number | null>(null);
	const lastHeadingRef = useRef<number | null>(null);

	useFocusEffect(
		useCallback(() => {
			let isActive = true;
			let positionSub: Location.LocationSubscription | undefined;
			let headingSub: Location.LocationSubscription | undefined;

			(async () => {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (!isActive) return;

				if (status !== "granted") {
					setCenter(SOONGSIL);
					return;
				}

				const loc = await Location.getCurrentPositionAsync({});
				if (!isActive) return;

				const userLoc = { lat: loc.coords.latitude, lng: loc.coords.longitude };
				setCenter(userLoc);
				setMyLocation(userLoc);

				const nextPositionSub = await Location.watchPositionAsync(
					{
						accuracy: Location.Accuracy.High,
						timeInterval: 2000,
						distanceInterval: 3,
					},
					(l) => {
						if (!isActive) return;

						setMyLocation({ lat: l.coords.latitude, lng: l.coords.longitude });
					},
				);

				if (!isActive) {
					nextPositionSub.remove();
					return;
				}
				positionSub = nextPositionSub;

				const nextHeadingSub = await Location.watchHeadingAsync((hdg) => {
					if (!isActive) return;

					const rounded = Math.round(hdg.magHeading);
					if (
						lastHeadingRef.current === null ||
						Math.abs(rounded - lastHeadingRef.current) >= HEADING_THRESHOLD_DEG
					) {
						lastHeadingRef.current = rounded;
						setHeading(rounded);
					}
				});

				if (!isActive) {
					nextHeadingSub.remove();
					return;
				}
				headingSub = nextHeadingSub;
			})();

			return () => {
				isActive = false;
				positionSub?.remove();
				headingSub?.remove();
			};
		}, []),
	);

	return { center, myLocation, heading };
}
