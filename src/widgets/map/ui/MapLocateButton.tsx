import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MapTargetIcon } from "@/shared/assets/icons";
import { shadows } from "@/shared/styles/shadows";

const TOP_OFFSET_BELOW_SEARCH_BAR = 80;
const EDGE_MARGIN = 15;
/** 피그마 현재위치 버튼: 46px 원 + 26px 타깃 아이콘 */
const ICON_SIZE = 26;

interface MapLocateButtonProps {
	onPress: () => void;
	disabled?: boolean;
	/** 기본 top-right(기존 지도) / bottom-left(신규 학생 지도 — 바텀시트 위) */
	placement?: "top-right" | "bottom-left";
	/** placement가 bottom-left일 때 화면 하단으로부터의 간격 */
	bottomOffset?: number;
}

export function MapLocateButton({
	onPress,
	disabled,
	placement = "top-right",
	bottomOffset = 0,
}: MapLocateButtonProps) {
	const insets = useSafeAreaInsets();
	const positionStyle =
		placement === "bottom-left"
			? { left: EDGE_MARGIN, bottom: bottomOffset }
			: { right: EDGE_MARGIN, top: insets.top + TOP_OFFSET_BELOW_SEARCH_BAR };

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			className="absolute h-[46px] w-[46px] items-center justify-center rounded-full bg-canvas"
			style={{
				...positionStyle,
				opacity: disabled ? 0.5 : 1,
				...shadows.neutral,
			}}
			hitSlop={8}
		>
			<MapTargetIcon width={ICON_SIZE} height={ICON_SIZE} />
		</Pressable>
	);
}
