import { clusterListLayout, clusterListStyles } from "./clusterStoreListStyles";

/** 매장명 목록 생성·선택 표시·지도 위치 갱신 스크립트 */
export function buildClusterStoreListScript(): string {
	return `
    var CLUSTER_LIST_LAYOUT = ${JSON.stringify(clusterListLayout)};
    var CLUSTER_LIST_STYLES = ${JSON.stringify(clusterListStyles)};

    function createClusterStoreList(items) {
      var list = createClusterListElement('div', CLUSTER_LIST_STYLES.list);
      list.setAttribute('role', 'group');
      list.setAttribute('aria-label', '겹친 매장 선택');
      preventClusterListMapEvents(list);

      var rows = items.map(function(item, index) {
        var row = createClusterStoreRow(item, index);
        list.appendChild(row.element);
        return row;
      });

      return {
        element: list,
        updateSelection: function(selectedId) {
          updateClusterRowSelection(rows, selectedId);
        }
      };
    }

    function createClusterListElement(tagName, style) {
      var element = document.createElement(tagName);
      element.style.cssText = style;
      return element;
    }

    function createClusterStoreRow(item, index) {
      var name = item.name || '제휴 매장';
      var row = createClusterListElement('button', CLUSTER_LIST_STYLES.row);
      row.type = 'button';
      row.setAttribute('aria-label', name);
      if (index > 0) row.style.borderTop = CLUSTER_LIST_STYLES.separator;

      var label = createClusterListElement('span', CLUSTER_LIST_STYLES.name);
      label.textContent = name;
      row.appendChild(createClusterStoreIcon(item.category));
      row.appendChild(label);
      row.addEventListener('click', function(event) {
        stopClusterListMapEvent(event);
        postMarkerPress(item.id);
      });

      return { id: String(item.id), element: row };
    }

    // 기존 카테고리 마커 에셋을 작은 목록 아이콘으로 재사용함
    function createClusterStoreIcon(category) {
      var icon = createClusterListElement('span', CLUSTER_LIST_STYLES.icon);
      var artwork = createClusterListElement('span', CLUSTER_LIST_STYLES.artwork);
      var categorySvgs = CATEGORY_MARKER_SVGS[category] || CATEGORY_MARKER_SVGS.OTHERS;
      artwork.innerHTML = categorySvgs.default;
      icon.appendChild(artwork);
      return icon;
    }

    function updateClusterRowSelection(rows, selectedId) {
      rows.forEach(function(row) {
        var selected = row.id === selectedId;
        row.element.style.boxShadow = selected ? CLUSTER_LIST_STYLES.selectedOutline : 'none';
        row.element.setAttribute('aria-pressed', String(selected));
      });
    }

    // 목록 내부 조작이 지도 드래그나 빈 영역 클릭으로 전달되는 것을 막음
    function stopClusterListMapEvent(event) {
      event.stopPropagation();
      kakao.maps.event.preventMap();
    }

    function preventClusterListMapEvents(list) {
      var eventTypes = ['mousedown', 'touchstart', 'touchmove', 'wheel', 'click', 'dblclick'];
      eventTypes.forEach(function(type) {
        list.addEventListener(type, stopClusterListMapEvent, { passive: true });
      });
    }

    function positionClusterStoreList(list, position) {
      if (list.style.display === 'none') return;
      var point = map.getProjection().containerPointFromCoords(position);
      var viewport = document.getElementById('map');
      var layout = CLUSTER_LIST_LAYOUT;
      var width = layout.width;
      var height = list.offsetHeight;

      // 기본 위치는 마커 오른쪽 위이며 공간이 부족한 방향만 반대로 전환함
      var left = point.x + layout.markerGap;
      if (left + width > viewport.clientWidth - layout.edgeMargin) {
        left = point.x - layout.markerGap - width;
      }
      var top = point.y - height - layout.markerGap;
      if (top < layout.edgeMargin) top = point.y + layout.markerGap;

      // 화면 안으로 보정한 좌표를 마커 기준 상대 위치로 변환함
      left = clampClusterListPosition(left, viewport.clientWidth, width);
      top = clampClusterListPosition(top, viewport.clientHeight, height);
      list.style.left = (left - point.x + layout.markerHalfSize) + 'px';
      list.style.top = (top - point.y + layout.markerHalfSize) + 'px';
    }

    function clampClusterListPosition(value, viewportSize, listSize) {
      var margin = CLUSTER_LIST_LAYOUT.edgeMargin;
      return Math.max(margin, Math.min(value, viewportSize - listSize - margin));
    }

    function repositionClusterStoreLists() {
      Object.keys(storeMarkers).forEach(function(key) {
        var marker = storeMarkers[key].marker;
        if (marker.repositionList) marker.repositionList();
      });
    }
`;
}
