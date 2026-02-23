import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { shadows } from "@/shared/styles/shadows";
import type { BottomSnackbarProps } from "../model/types";

const DEFAULT_HORIZONTAL_INSET = 24;
const DEFAULT_BOTTOM_OFFSET = 0;
const ANIMATION_DURATION_MS = 180;

export function BottomSnackbar({
	visible,
	title,
	subtitle,
	actions,
	bottomOffset = DEFAULT_BOTTOM_OFFSET,
	horizontalInset = DEFAULT_HORIZONTAL_INSET,
	testID,
}: BottomSnackbarProps) {
	const [shouldRender, setShouldRender] = useState(visible);
	const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;

	useEffect(() => {
		if (visible) {
			setShouldRender(true);
		}

		Animated.timing(progress, {
			toValue: visible ? 1 : 0,
			duration: ANIMATION_DURATION_MS,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (!finished) return;
			if (!visible) setShouldRender(false);
		});
	}, [progress, visible]);

	const animatedStyle = useMemo(() => {
		const translateY = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [10, 0],
		});

		return {
			opacity: progress,
			transform: [{ translateY }],
		} as const;
	}, [progress]);

	if (!shouldRender) return null;

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

