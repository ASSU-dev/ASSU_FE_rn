import { colorTokens } from "@/shared/styles/tokens";
import { useEffect, useRef } from "react";
import { Pressable } from "react-native";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type ColorTokenKey = keyof typeof colorTokens;

const DEFAULT_WIDTH = 48;
const DEFAULT_HEIGHT = 30;
const DEFAULT_PADDING = 2.5;
const DEFAULT_DURATION = 200;

interface ToggleProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	trackColorOn?: ColorTokenKey;
	trackColorOff?: ColorTokenKey;
	thumbColor?: ColorTokenKey;
	width?: number;
	height?: number;
	padding?: number;
	duration?: number;
}

export function Toggle({
	value,
	onValueChange,
	trackColorOn = "primary",
	trackColorOff = "contentSecondary",
	thumbColor = "canvas",
	width = DEFAULT_WIDTH,
	height = DEFAULT_HEIGHT,
	padding = DEFAULT_PADDING,
	duration = DEFAULT_DURATION,
}: ToggleProps) {
	const thumbSize = height - padding * 2;
	const thumbTranslateOn = width - thumbSize - padding * 2;

	const progress = useSharedValue(value ? 1 : 0);
	const durationRef = useRef(duration);
	durationRef.current = duration;

	useEffect(() => {
		progress.value = withTiming(value ? 1 : 0, { duration: durationRef.current });
	}, [value, duration, progress]);

	const trackStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			[colorTokens[trackColorOff], colorTokens[trackColorOn]],
		),
	}));

	const thumbStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(progress.value, [0, 1], [0, thumbTranslateOn]),
			},
		],
	}));

	return (
		<Pressable onPress={() => onValueChange(!value)}>
			<Animated.View
				style={[
					{
						width,
						height,
						borderRadius: 999,
						padding,
						justifyContent: "center",
					},
					trackStyle,
				]}
			>
				<Animated.View
					style={[
						{
							width: thumbSize,
							height: thumbSize,
							borderRadius: 999,
							backgroundColor: colorTokens[thumbColor],
						},
						thumbStyle,
					]}
				/>
			</Animated.View>
		</Pressable>
	);
}
