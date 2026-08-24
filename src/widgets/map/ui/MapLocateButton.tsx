import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";

const TOP_OFFSET_BELOW_SEARCH_BAR = 80;
const EDGE_MARGIN = 15;

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
			className="absolute flex-row items-center justify-center gap-gutter rounded-full bg-canvas p-gutter"
			style={{
				...positionStyle,
				opacity: disabled ? 0.5 : 1,
				...shadows.neutral,
			}}
			hitSlop={8}
		>
			<Ionicons name="locate" size={20} color={colorTokens.contentPrimary} />
		</Pressable>
	);
}
