import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { StyleSheet } from "react-native";
import WebView, {
	type WebViewMessageEvent,
	type WebViewProps,
} from "react-native-webview";

import { colorTokens } from "@/shared/styles/tokens";
import { partnerMarkerSvg } from "./partnerMarkerSvg";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	return {
		r: Number.parseInt(hex.slice(1, 3), 16),
		g: Number.parseInt(hex.slice(3, 5), 16),
		b: Number.parseInt(hex.slice(5, 7), 16),
	};
}

type KakaoWebViewSource = NonNullable<WebViewProps["source"]>;

type KakaoMapProps = {
	initialCenter?: { lat: number; lng: number };
	myLocation?: { lat: number; lng: number } | null;
	heading?: number | null;
	markers?: KakaoMapMarker[];
	partnerMarkersEnabled?: boolean;
	selectedMarkerId?: string | null;
	onMarkerPress?: (markerId: string) => void;
	onMapPress?: () => void;
};

export type KakaoMapHandle = {
	panTo: (lat: number, lng: number) => void;
};

export type KakaoMapMarker = {
	id: string;
	name: string;
	latitude: number;
	longitude: number;
	hasPartner?: boolean;
};

const SOONGSIL = { lat: 37.4963, lng: 126.9572 };

export const KakaoMap = forwardRef<KakaoMapHandle, KakaoMapProps>(
	function KakaoMap(
		{
			initialCenter = SOONGSIL,
			myLocation,
			heading,
			markers = [],
			partnerMarkersEnabled = false,
			selectedMarkerId,
			onMarkerPress,
			onMapPress,
		},
		ref,
	) {
		const appKey = process.env.EXPO_PUBLIC_KAKAO_JS_KEY?.trim();
		const webViewRef = useRef<WebView>(null);
		const prevMarkersRef = useRef<string>("");
		const [isMapReady, setIsMapReady] = useState(false);
		const webViewSource = useMemo<KakaoWebViewSource | null>(() => {
			if (!appKey) return null;

			return {
				html: buildMapHtml(appKey),
				baseUrl: "http://localhost",
			};
		}, [appKey]);

		useEffect(() => {
			if (appKey || !__DEV__) return;

			console.error(
				"KakaoMap requires EXPO_PUBLIC_KAKAO_JS_KEY to render the map.",
			);
		}, [appKey]);

		useImperativeHandle(ref, () => ({
			panTo: (lat, lng) => {
				webViewRef.current?.injectJavaScript(
					`map.panTo(new kakao.maps.LatLng(${lat}, ${lng})); true;`,
				);
			},
		}));

		// Recenter the map when returning to this tab.
		useEffect(() => {
			if (!isMapReady) return;
			webViewRef.current?.injectJavaScript(`
			map.setCenter(new kakao.maps.LatLng(${initialCenter.lat}, ${initialCenter.lng}));
			map.setLevel(3);
			true;
		`);
		}, [initialCenter.lat, initialCenter.lng, isMapReady]);

		// Create or move the current-location overlay.
		useEffect(() => {
			if (!isMapReady || !myLocation) return;
			webViewRef.current?.injectJavaScript(
				`window.updateMyLocation(${myLocation.lat}, ${myLocation.lng}); true;`,
			);
		}, [myLocation, isMapReady]);

		// Update only the heading cone transform.
		useEffect(() => {
			if (!isMapReady) return;
			webViewRef.current?.injectJavaScript(
				`window.updateHeading(${heading ?? "null"}); true;`,
			);
		}, [heading, isMapReady]);

		useEffect(() => {
			if (!isMapReady) return;
			const markerPayload = markers.map((marker) => ({
				...marker,
				isPartnerMarker: partnerMarkersEnabled && marker.hasPartner === true,
				selected: marker.id === selectedMarkerId,
			}));
			const serializedMarkers = JSON.stringify(markerPayload).replace(
				/</g,
				"\\u003c",
			);
			if (prevMarkersRef.current === serializedMarkers) return;
			prevMarkersRef.current = serializedMarkers;

			webViewRef.current?.injectJavaScript(
				`window.updateStoreMarkers(${serializedMarkers}); true;`,
			);
		}, [isMapReady, markers, partnerMarkersEnabled, selectedMarkerId]);

		const handleMessage = (event: WebViewMessageEvent) => {
			try {
				const data = JSON.parse(event.nativeEvent.data) as {
					type: string;
					markerId?: string;
				};
				if (data.type === "MAP_READY") setIsMapReady(true);
				if (data.type === "MARKER_PRESS" && data.markerId) {
					onMarkerPress?.(data.markerId);
				}
				if (data.type === "MAP_PRESS") onMapPress?.();
			} catch (error) {
				if (__DEV__) {
					console.warn(
						"KakaoMap received an invalid WebView message.",
						event.nativeEvent.data,
						error,
					);
				}
			}
		};

		if (!webViewSource) return null;

		return (
			<WebView
				ref={webViewRef}
				source={webViewSource}
				style={StyleSheet.absoluteFillObject}
				originWhitelist={["*"]}
				javaScriptEnabled
				scrollEnabled={false}
				onMessage={handleMessage}
			/>
		);
	},
);

function buildMapHtml(appKey: string): string {
	const { r, g, b } = hexToRgb(colorTokens.primary);
	const primary = colorTokens.primary;
	const canvas = colorTokens.canvas;
	const coneFill = `rgba(${r},${g},${b},0.35)`;
	const ring = `rgba(${r},${g},${b},0.15)`;
	const markerSvg = JSON.stringify(partnerMarkerSvg);
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
        var position = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);

        if (markerData.isPartnerMarker) {
          var selected = markerData.selected === true;
          var container = document.createElement('button');
          container.type = 'button';
          container.style.cssText = 'border:0;background:transparent;padding:0;display:flex;flex-direction:column;align-items:center;cursor:pointer;overflow:visible;';
          container.setAttribute('aria-label', markerData.name || '제휴 가게');

          var iconSize = selected ? 40 : 25;
          var shellSize = selected ? 60 : 25;
          var iconShell = document.createElement('div');
          iconShell.style.cssText = 'width:' + shellSize + 'px;height:' + shellSize + 'px;display:flex;align-items:center;justify-content:center;';
          var icon = document.createElement('div');
          icon.style.cssText = 'width:' + iconSize + 'px;height:' + iconSize + 'px;filter:drop-shadow(0 2px 4px rgba(0,104,254,0.35));transition:width 0.15s ease,height 0.15s ease;';
          icon.innerHTML = ${markerSvg};
          var svg = icon.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', String(iconSize));
            svg.setAttribute('height', String(iconSize));
          }
          iconShell.appendChild(icon);
          container.appendChild(iconShell);

          if (selected && markerData.name) {
            var label = document.createElement('span');
            label.textContent = markerData.name;
            label.style.cssText = 'margin-top:2px;color:${primary};font-size:12px;font-weight:600;line-height:16px;white-space:nowrap;text-shadow:0 1px 2px ${canvas};';
            container.appendChild(label);
          }

          container.addEventListener('click', function(event) {
            event.stopPropagation();
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MARKER_PRESS', markerId: String(markerData.id) }));
          });

          var overlay = new kakao.maps.CustomOverlay({
            position: position,
            content: container,
            xAnchor: 0.5,
            yAnchor: selected ? 0.35 : 0.5,
            zIndex: selected ? 20 : 5
          });
          overlay.setMap(map);
          storeMarkers.push(overlay);
          return;
        }

        var marker = new kakao.maps.Marker({ position: position, title: markerData.name || '' });
        marker.setMap(map);
        storeMarkers.push(marker);
      });
    };

    function initMap() {
      var initialPos = new kakao.maps.LatLng(${SOONGSIL.lat}, ${SOONGSIL.lng});
      map = new kakao.maps.Map(document.getElementById('map'), {
        center: initialPos,
        level: 3
      });
      kakao.maps.event.addListener(map, 'click', function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_PRESS' }));
      });
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_READY' }));
    }
  </script>
  <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false"></script>
  <script>kakao.maps.load(initMap);</script>
</body>
</html>`;
}
