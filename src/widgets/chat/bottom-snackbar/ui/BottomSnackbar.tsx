import { Animated, Text, View } from "react-native";
import { useFadeSlideVisibility } from "@/shared/lib/hooks/useFadeSlideVisibility";
import { shadows } from "@/shared/styles/shadows";
import type { BottomSnackbarProps } from "../model/types";

const DEFAULT_HORIZONTAL_INSET = 24;
const DEFAULT_BOTTOM_OFFSET = 0;

export function BottomSnackbar({
	visible,
	title,
	subtitle,
	actions,
	bottomOffset = DEFAULT_BOTTOM_OFFSET,
	horizontalInset = DEFAULT_HORIZONTAL_INSET,
	testID,
}: BottomSnackbarProps) {
	const { shouldRender, animatedStyle } = useFadeSlideVisibility(visible);
	
	if (!shouldRender) return null; //visible false가 실행 되더라도 애니메이션은 끝까지 실행시킨 후 사라지게 함 

	return (
		<Animated.View
			testID={testID}
			pointerEvents={visible ? "auto" : "none"}
			style={[
				{
					position: "absolute",
					left: horizontalInset,
					right: horizontalInset,
					bottom: bottomOffset,
				},
				animatedStyle,
			]}
		>
			<View
				className="bg-canvas rounded-2xl px-5 py-4"
				style={shadows.neutral}
			>
				<Text className="text-lg font-bold text-content-primary">{title}</Text>
				{!!subtitle && (
					<Text className="mt-1 text-sm font-regular text-content-secondary">
						{subtitle}
					</Text>
				)}

				{!!actions && <View className="mt-4">{actions}</View>}
			</View>
		</Animated.View>
	);
}

