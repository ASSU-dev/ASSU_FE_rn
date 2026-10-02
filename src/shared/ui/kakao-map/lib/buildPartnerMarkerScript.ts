import { colorTokens } from "@/shared/styles/tokens";
import { partnerMarkerSvg } from "../partnerMarkerSvg";

/** 카테고리 아이콘 미사용 지도에 기본 제휴 마커 표시 */
export function buildPartnerMarkerScript(): string {
	const primary = colorTokens.primary;
	const canvas = colorTokens.canvas;
	const markerSvg = JSON.stringify(partnerMarkerSvg);
	return `
    function renderPartnerMarker(markerData) {
      var position = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
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
        postMarkerPress(markerData.id);
      });

      var overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: container,
        xAnchor: 0.5,
        yAnchor: selected ? 0.35 : 0.5,
        zIndex: selected ? 20 : 5
      });
      overlay.setMap(map);
      return overlay;
    }
`;
}
