/** 마커 목록·선택 상태 갱신 및 기존 마커 재사용 */
export function buildMarkerStateScript(): string {
	return `
    var storeMarkers = Object.create(null);
    var storeData = [];
    var clusteringEnabled = false;
    var activeClusterMarkerIds = [];

    function postMarkerPress(markerId) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MARKER_PRESS', markerId: String(markerId) }));
    }

    window.updateStoreMarkers = function(markers, options) {
      storeData = Array.isArray(markers) ? markers : [];
      clusteringEnabled = !!(options && options.clustering);
      activeClusterMarkerIds = options && Array.isArray(options.activeClusterMarkerIds)
        ? options.activeClusterMarkerIds : [];
      renderStoreMarkers();
    };

    // ID와 표시 내용이 같으면 기존 마커를 그대로 재사용함
    function retainStoreMarker(nextMarkers, key, signature, createMarker) {
      var previous = storeMarkers[key];
      nextMarkers[key] = previous && previous.signature === signature
        ? previous
        : { signature: signature, marker: createMarker() };
    }

    function renderStoreMarkers() {
      var nextMarkers = Object.create(null);
      var singles = [];
      var clusterable = [];
      storeData.forEach(function(markerData) {
        if (typeof markerData.latitude !== 'number' || typeof markerData.longitude !== 'number') return;
        if (clusteringEnabled && markerData.categoryMarker &&
          (markerData.selected !== true || activeClusterMarkerIds.indexOf(String(markerData.id)) >= 0)) {
          clusterable.push(markerData);
        } else {
          singles.push(markerData);
        }
      });

      // 응답 순서와 무관하게 같은 기준으로 매장을 묶도록 ID순 정렬
      clusterable.sort(function(left, right) {
        var leftId = String(left.id);
        var rightId = String(right.id);
        return leftId < rightId ? -1 : leftId > rightId ? 1 : 0;
      });
      buildClusters(clusterable).forEach(function(cluster) {
        if (cluster.items.length > 1) {
          var key = 'cluster:' + JSON.stringify(cluster.items.map(function(item) { return String(item.id); }));
          var signature = JSON.stringify(cluster.items.map(function(item) { return [item.latitude, item.longitude, item.name, item.category]; }));
          retainStoreMarker(nextMarkers, key, signature, function() {
            return renderClusterMarker(cluster);
          });
          var ids = cluster.items.map(function(item) { return String(item.id); });
          var isOpen = map.getLevel() === MIN_MAP_LEVEL && ids.length === activeClusterMarkerIds.length &&
            ids.every(function(id) { return activeClusterMarkerIds.indexOf(id) >= 0; });
          var selected = cluster.items.find(function(item) { return item.selected === true; });
          nextMarkers[key].marker.updateSelection(isOpen, selected ? String(selected.id) : null);
        } else {
          singles.push(cluster.items[0]);
        }
      });
      singles.forEach(function(markerData) {
        var key = 'store:' + String(markerData.id);
        var signature = JSON.stringify([
          markerData.latitude, markerData.longitude, markerData.name,
          markerData.category, markerData.categoryMarker ? null : markerData.selected === true,
          markerData.categoryMarker === true, markerData.isPartnerMarker === true
        ]);
        retainStoreMarker(nextMarkers, key, signature, function() {
          return renderSingleMarker(markerData);
        });
        if (markerData.categoryMarker) {
          nextMarkers[key].marker.updateSelection(markerData.selected === true);
        }
      });

      // 새 마커 표시 후 불필요하거나 교체된 마커만 제거함
      Object.keys(storeMarkers).forEach(function(key) {
        if (storeMarkers[key] !== nextMarkers[key]) {
          storeMarkers[key].marker.setMap(null);
        }
      });
      storeMarkers = nextMarkers;
    }

    function renderSingleMarker(markerData) {
      if (markerData.categoryMarker) return renderCategoryMarker(markerData);
      if (markerData.isPartnerMarker) return renderPartnerMarker(markerData);
      return renderDefaultMarker(markerData);
    }

    function renderDefaultMarker(markerData) {
      var position = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
      var marker = new kakao.maps.Marker({ position: position, title: markerData.name || '' });
      kakao.maps.event.addListener(marker, 'click', function() {
        postMarkerPress(markerData.id);
      });
      marker.setMap(map);
      return marker;
    }
`;
}
