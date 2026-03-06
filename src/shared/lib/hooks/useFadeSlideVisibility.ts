import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

export type UseFadeSlideVisibilityOptions = {
	/** 애니메이션 지속 시간 (ms) */
	duration?: number;
	/** 숨김 시 translateY (0 = 보임, 이 값 = 숨김) */
	translateYFrom?: number;
};

const DEFAULT_DURATION_MS = 180;
const DEFAULT_TRANSLATE_Y_FROM = 10;

/**
 * fade + slide up visibility 애니메이션 훅.
 * visible이 true면 opacity 0→1, translateY from→0으로 나타나고,
 * false면 반대로 사라진 뒤 shouldRender가 false가 되어 언마운트됩니다.
 */
export function useFadeSlideVisibility(
	visible: boolean,
	options?: UseFadeSlideVisibilityOptions,
) {
	const duration = options?.duration ?? DEFAULT_DURATION_MS;
	const translateYFrom = options?.translateYFrom ?? DEFAULT_TRANSLATE_Y_FROM;

	const [shouldRender, setShouldRender] = useState(visible);
	const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;

	useEffect(() => {
		if (visible) {
			setShouldRender(true);
		}

		Animated.timing(progress, {
			toValue: visible ? 1 : 0,
			duration,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (!finished) return;
			if (!visible) setShouldRender(false);
		});
	}, [progress, visible, duration]);

	const animatedStyle = useMemo(() => {
		const translateY = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [translateYFrom, 0],
		});

		return {
			opacity: progress,
			transform: [{ translateY }],
		} as const;
	}, [progress, translateYFrom]);

	return { shouldRender, animatedStyle };
}
