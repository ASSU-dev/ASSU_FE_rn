import { buildCategoryMarkerScript } from "./buildCategoryMarkerScript";
import { buildClusterMarkerScript } from "./buildClusterMarkerScript";
import { buildMarkerStateScript } from "./buildMarkerStateScript";
import { buildPartnerMarkerScript } from "./buildPartnerMarkerScript";

/** 카카오 지도 WebView에서 실행할 마커 스크립트 조립 */
export function buildMarkerScript(): string {
	return [
		buildMarkerStateScript(),
		buildCategoryMarkerScript(),
		buildClusterMarkerScript(),
		buildPartnerMarkerScript(),
	].join("\n");
}
