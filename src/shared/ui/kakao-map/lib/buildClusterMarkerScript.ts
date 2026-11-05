import { colorTokens } from "@/shared/styles/tokens";

/** 인접 매장 그룹화 및 클러스터 매장 수 표시 */
export function buildClusterMarkerScript(): string {
	const { canvas, primary, contentPrimary } = colorTokens;
	return `
    var CLUSTER_RADIUS_PX = 36;
    // 일반 지도의 최대 확대 단계
    var MIN_MAP_LEVEL = 1;

    function buildClusters(items) {
      if (items.length === 0) return [];
      var projection = map.getProjection();
      var clusters = [];
      items.forEach(function(item) {
        var point = projection.containerPointFromCoords(new kakao.maps.LatLng(item.latitude, item.longitude));
        var matched = null;
        for (var i = 0; i < clusters.length; i++) {
          var dx = clusters[i].x - point.x;
          var dy = clusters[i].y - point.y;
          if (Math.sqrt(dx * dx + dy * dy) <= CLUSTER_RADIUS_PX) { matched = clusters[i]; break; }
        }
        if (matched) {
          matched.items.push(item);
        } else {
          clusters.push({ x: point.x, y: point.y, items: [item] });
        }
      });
      return clusters;
    }

    function renderClusterMarker(cluster) {
      var latSum = 0;
      var lngSum = 0;
      cluster.items.forEach(function(item) { latSum += item.latitude; lngSum += item.longitude; });
      var position = new kakao.maps.LatLng(latSum / cluster.items.length, lngSum / cluster.items.length);

      var root = document.createElement('div');
      root.style.cssText = 'position:relative;width:34px;height:34px;';
      var storeList = null;
      var container = document.createElement('button');
      container.type = 'button';
      container.textContent = String(cluster.items.length);
      container.style.cssText = 'border:0;width:34px;height:34px;border-radius:50%;background:${canvas};box-shadow:0 0 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:${contentPrimary};cursor:pointer;';
      container.setAttribute('aria-label', cluster.items.length + '개 매장');
      root.appendChild(container);

      container.addEventListener('click', function(event) {
        event.stopPropagation();
        kakao.maps.event.preventMap();
        var currentLevel = map.getLevel();
        // 확대 가능한 경우 클릭한 클러스터 위치를 기준으로 한 단계 확대함
        if (currentLevel > MIN_MAP_LEVEL) {
          map.setLevel(currentLevel - 1, { anchor: position });
          return;
        }
        // 최대 확대 상태에서 겹친 매장만 목록으로 표시함
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'CLUSTER_PRESS',
          markerIds: cluster.items.map(function(item) { return String(item.id); })
        }));
      });

      var overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: root,
        clickable: true,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 4
      });
      overlay.repositionList = function() {
        if (storeList) positionClusterStoreList(storeList.element, position);
      };
      overlay.updateSelection = function(isOpen, selectedId) {
        container.style.background = isOpen ? '${primary}' : '${canvas}';
        container.style.color = isOpen ? '${canvas}' : '${contentPrimary}';
        container.setAttribute('aria-expanded', String(isOpen));
        overlay.setZIndex(isOpen ? 30 : 4);
        // 열린 클러스터만 목록을 생성하고 선택 변경 시 기존 스크롤 위치 유지
        if (isOpen && !storeList) {
          storeList = createClusterStoreList(cluster.items);
          root.appendChild(storeList.element);
        }
        if (storeList) {
          storeList.element.style.display = isOpen ? 'block' : 'none';
          storeList.updateSelection(selectedId);
          overlay.repositionList();
        }
      };
      overlay.setMap(map);
      return overlay;
    }
`;
}
