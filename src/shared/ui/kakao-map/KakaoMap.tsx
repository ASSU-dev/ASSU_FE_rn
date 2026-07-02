import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { StyleSheet } from "react-native";
import WebView, { type WebViewMessageEvent } from "react-native-webview";

import { colorTokens } from "@/shared/styles/tokens";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	return {
		r: Number.parseInt(hex.slice(1, 3), 16),
		g: Number.parseInt(hex.slice(3, 5), 16),
		b: Number.parseInt(hex.slice(5, 7), 16),
	};
}

type KakaoMapProps = {
	initialCenter?: { lat: number; lng: number };
	myLocation?: { lat: number; lng: number } | null;
	heading?: number | null;
	markers?: KakaoMapMarker[];
};

export type KakaoMapHandle = {
	panTo: (lat: number, lng: number) => void;
};

export type KakaoMapMarker = {
	id: string;
	name: string;
	latitude: number;
	longitude: number;
};

const SOONGSIL = { lat: 37.4963, lng: 126.9572 };

export const KakaoMap = forwardRef<KakaoMapHandle, KakaoMapProps>(
	function KakaoMap(
		{ initialCenter = SOONGSIL, myLocation, heading, markers = [] },
		ref,
	) {
		const appKey = process.env.EXPO_PUBLIC_KAKAO_JS_KEY ?? "";
		const webViewRef = useRef<WebView>(null);
		const prevMarkersRef = useRef<string>("");
		const [isMapReady, setIsMapReady] = useState(false);

		useImperativeHandle(ref, () => ({
			panTo: (lat, lng) => {
				webViewRef.current?.injectJavaScript(
					`map.panTo(new kakao.maps.LatLng(${lat}, ${lng})); true;`,
				);
			},
		}));

		// 탭 복귀 시 카메라 이동
		useEffect(() => {
			if (!isMapReady) return;
			webViewRef.current?.injectJavaScript(`
			map.setCenter(new kakao.maps.LatLng(${initialCenter.lat}, ${initialCenter.lng}));
			map.setLevel(3);
			true;
		`);
		}, [initialCenter, isMapReady]);

		// 위치 변경 → 오버레이 생성 or 위치만 이동
		useEffect(() => {
			if (!isMapReady || !myLocation) return;
			webViewRef.current?.injectJavaScript(
				`window.updateMyLocation(${myLocation.lat}, ${myLocation.lng}); true;`,
			);
		}, [myLocation, isMapReady]);

		// 방향 변경 → cone의 CSS transform만 교체 (DOM 재생성 없음)
		useEffect(() => {
			if (!isMapReady) return;
			webViewRef.current?.injectJavaScript(
				`window.updateHeading(${heading ?? "null"}); true;`,
			);
		}, [heading, isMapReady]);

		useEffect(() => {
			if (!isMapReady) return;
			const serializedMarkers = JSON.stringify(markers).replace(
				/</g,
				"\\u003c",
			);
			if (prevMarkersRef.current === serializedMarkers) return;
			prevMarkersRef.current = serializedMarkers;

			webViewRef.current?.injectJavaScript(
				`window.updateStoreMarkers(${serializedMarkers}); true;`,
			);
		}, [isMapReady, markers]);

		const handleMessage = (event: WebViewMessageEvent) => {
			try {
				const data = JSON.parse(event.nativeEvent.data) as { type: string };
				if (data.type === "MAP_READY") setIsMapReady(true);
			} catch {}
		};

		return (
			<WebView
				ref={webViewRef}
				source={{
					html: buildMapHtml(appKey, initialCenter),
					baseUrl: "http://localhost",
				}}
				style={StyleSheet.absoluteFill}
				originWhitelist={["*"]}
				javaScriptEnabled
				scrollEnabled={false}
				onMessage={handleMessage}
			/>
		);
	},
);

function buildMapHtml(
	appKey: string,
	center: { lat: number; lng: number },
): string {
	const { r, g, b } = hexToRgb(colorTokens.primary);
	const primary = colorTokens.primary;
	const canvas = colorTokens.canvas;
	const coneFill = `rgba(${r},${g},${b},0.35)`;
	const ring = `rgba(${r},${g},${b},0.15)`;
	return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; overflow: hidden; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map;
    var myLocationOverlay = null;
    var storeMarkers = [];

    function createMyLocationOverlay(position) {
      var content =
        '<div style="position:relative;width:16px;height:16px;">' +
          '<div id="loc-cone" style="position:absolute;bottom:8px;left:2px;width:12px;height:20px;transform-origin:6px 100%;transform:rotate(0deg);transition:transform 0.2s linear;">' +
            '<svg width="12" height="20" viewBox="0 0 12 20" fill="${coneFill}"><polygon points="6,0 0,20 12,20"/></svg>' +
          '</div>' +
          '<div style="position:absolute;top:0;right:0;bottom:0;left:0;background:${primary};border:2.5px solid ${canvas};border-radius:50%;box-shadow:0 0 0 6px ${ring};"></div>' +
        '</div>';
      myLocationOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 10
      });
      myLocationOverlay.setMap(map);
    }

    window.updateMyLocation = function(lat, lng) {
      var position = new kakao.maps.LatLng(lat, lng);
      if (myLocationOverlay) {
        myLocationOverlay.setPosition(position);
      } else {
        createMyLocationOverlay(position);
      }
    };

    window.updateHeading = function(heading) {
      var cone = document.getElementById('loc-cone');
      if (!cone || heading === null || heading === undefined) return;
      cone.style.transform = 'rotate(' + heading + 'deg)';
    };

    window.updateStoreMarkers = function(markers) {
      storeMarkers.forEach(function(marker) { marker.setMap(null); });
      storeMarkers = [];
      if (!Array.isArray(markers)) return;

      markers.forEach(function(markerData) {
        if (typeof markerData.latitude !== 'number' || typeof markerData.longitude !== 'number') return;
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(markerData.latitude, markerData.longitude),
          title: markerData.name || ''
        });
        marker.setMap(map);
        storeMarkers.push(marker);
      });
    };

    function initMap() {
      var initialPos = new kakao.maps.LatLng(${center.lat}, ${center.lng});
      map = new kakao.maps.Map(document.getElementById('map'), {
        center: initialPos,
        level: 3
      });
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_READY' }));
    }
  </script>
  <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false"></script>
  <script>kakao.maps.load(initMap);</script>
</body>
</html>`;
}
