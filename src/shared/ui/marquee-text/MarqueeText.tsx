import { useEffect, useState } from "react";
import { type LayoutChangeEvent, Text, View } from "react-native";
import Animated, {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

const DEFAULT_SPEED = 30;
const DEFAULT_PAUSE_MS = 1000;
const MEASURE_WIDTH = 9999;
const OVERFLOW_THRESHOLD = 1;

interface MarqueeTextProps {
	text: string;
	className?: string;
	speed?: number;
	pauseMs?: number;
}

// 한 줄 텍스트가 컨테이너 너비를 넘으면 끝까지 이동했다가 처음으로 되돌아오는 동작을 반복
export function MarqueeText({
	text,
	className,
	speed = DEFAULT_SPEED,
	pauseMs = DEFAULT_PAUSE_MS,
}: MarqueeTextProps) {
	const [containerWidth, setContainerWidth] = useState(0);
	const [textWidth, setTextWidth] = useState(0);
	const translateX = useSharedValue(0);

	const overflow = textWidth - containerWidth;
	const isOverflowing = containerWidth > 0 && overflow > OVERFLOW_THRESHOLD;

	useEffect(() => {
		cancelAnimation(translateX);
		translateX.value = 0;
		if (!isOverflowing) return;

		const duration = (overflow / speed) * 1000;
		const timing = { duration, easing: Easing.linear };
		translateX.value = withRepeat(
			withSequence(
				withDelay(pauseMs, withTiming(-overflow, timing)),
				withDelay(pauseMs, withTiming(0, timing)),
			),
			-1,
		);

		return () => cancelAnimation(translateX);
	}, [isOverflowing, overflow, speed, pauseMs, translateX]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const handleContainerLayout = (event: LayoutChangeEvent) => {
		setContainerWidth(event.nativeEvent.layout.width);
	};

	const handleMeasureLayout = (event: LayoutChangeEvent) => {
		setTextWidth(Math.ceil(event.nativeEvent.layout.width));
	};

	return (
		<View
			className="shrink flex-row overflow-hidden"
			onLayout={handleContainerLayout}
		>
			<View
				className="absolute top-0 left-0 flex-row opacity-0"
				style={{ width: MEASURE_WIDTH }}
				pointerEvents="none"
				accessibilityElementsHidden
				importantForAccessibility="no-hide-descendants"
			>
				<Text className={className} onLayout={handleMeasureLayout}>
					{text}
				</Text>
			</View>
			<Animated.View
				style={[textWidth ? { width: textWidth } : undefined, animatedStyle]}
			>
				<Text className={className} numberOfLines={1}>
					{text}
				</Text>
			</Animated.View>
		</View>
	);
}
