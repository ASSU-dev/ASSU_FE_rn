import { colorTokens } from "@/shared/styles/tokens";

/** 클러스터 목록 크기와 지도 경계 보정값 */
export const clusterListLayout = {
	width: 146,
	rowHeight: 37.5,
	visibleRows: 3,
	edgeMargin: 8,
	markerGap: 20,
	markerHalfSize: 17,
} as const;

const { canvas, contentPrimary, neutralVariant, primary } = colorTokens;

/** WebView 내부 DOM에 적용할 스타일 */
export const clusterListStyles = {
	list: `
		position: absolute;
		display: none;
		width: ${clusterListLayout.width}px;
		max-height: ${clusterListLayout.rowHeight * clusterListLayout.visibleRows}px;
		overflow-y: auto;
		overscroll-behavior: contain;
		touch-action: pan-y;
		border-radius: 7px;
		background: ${canvas};
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	`,
	row: `
		position: relative;
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		height: ${clusterListLayout.rowHeight}px;
		padding: 7px;
		border: 0;
		background: ${canvas};
		color: ${contentPrimary};
		cursor: pointer;
		text-align: left;
	`,
	icon: `
		position: relative;
		flex: 0 0 22.5px;
		height: 22.5px;
		pointer-events: none;
	`,
	// 원본 70px 마커의 여백을 보정하고 원형 아이콘을 22.5px로 축소함
	artwork: `
		position: absolute;
		left: -15px;
		top: -15px;
		width: 70px;
		height: 70px;
		transform: scale(0.75);
		transform-origin: top left;
		line-height: 0;
	`,
	name: `
		min-width: 0;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: Pretendard, -apple-system, sans-serif;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: -0.24px;
		line-height: 14px;
	`,
	separator: `1px solid ${neutralVariant}`,
	selectedOutline: `inset 0 0 0 2px ${primary}`,
} as const;
