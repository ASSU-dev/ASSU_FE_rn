import { colorTokens } from "@/shared/styles/tokens";
import { categoryMarkerSvgs } from "../mapMarkerSvgs";

/** 선택 전후 중심 위치를 유지하는 카테고리 마커 표시 */
export function buildCategoryMarkerScript(): string {
	const canvas = colorTokens.canvas;
	const categorySvgsJson = JSON.stringify(categoryMarkerSvgs).replace(
		/</g,
		"\\u003c",
	);
	return `
    var CATEGORY_MARKER_SVGS = ${categorySvgsJson};

    function renderCategoryMarker(markerData) {
      var position = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
      var svgs = CATEGORY_MARKER_SVGS[markerData.category] || CATEGORY_MARKER_SVGS.OTHERS;
      var selected = markerData.selected === true;

      var container = document.createElement('button');
      container.type = 'button';
      container.style.cssText = 'border:0;background:transparent;padding:0;position:relative;display:block;appearance:none;-webkit-appearance:none;width:70px;height:70px;cursor:pointer;overflow:visible;';
      container.setAttribute('aria-label', markerData.name || '제휴 가게');

      // 큰 아이콘의 원 중심(y=42)을 7px 위로 보정해 작은 아이콘의 중심과 일치시킴
      var icon = document.createElement('div');
      icon.style.cssText = 'position:absolute;left:0;top:' + (selected ? -7 : 0) + 'px;width:70px;height:70px;line-height:0;text-align:left;pointer-events:none;';
      icon.innerHTML = selected ? svgs.selected : svgs.default;
      icon.firstElementChild.style.display = 'block';
      container.appendChild(icon);

      var label = null;
      if (markerData.name) {
        label = document.createElement('div');
        label.style.cssText = 'position:absolute;top:' + (selected ? 60 : 53) + 'px;left:50%;transform:translateX(-50%);text-align:center;white-space:nowrap;pointer-events:none;';
        var nameText = document.createElement('div');
        nameText.textContent = markerData.name;
        nameText.style.cssText = 'color:#040404;font-size:12px;font-weight:600;line-height:15px;text-shadow:0 0 3px ${canvas},0 0 3px ${canvas},0 0 3px ${canvas};';
        label.appendChild(nameText);
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
        yAnchor: 0.5,
        zIndex: selected ? 20 : 6
      });
      // 지도 이동 중 마커 재생성을 방지하고 기존 마커의 모양만 변경함
      // 선택 전후 아이콘 중심을 70px 영역의 (35, 35)로 유지함
      overlay.updateSelection = function(nextSelected) {
        if (selected === nextSelected) return;
        selected = nextSelected;
        icon.style.top = (selected ? -7 : 0) + 'px';
        icon.innerHTML = selected ? svgs.selected : svgs.default;
        icon.firstElementChild.style.display = 'block';
        if (label) label.style.top = (selected ? 60 : 53) + 'px';
        overlay.setZIndex(selected ? 20 : 6);
      };
      overlay.setMap(map);
      return overlay;
    }
`;
}
