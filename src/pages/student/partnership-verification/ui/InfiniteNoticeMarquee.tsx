import { useEffect, useRef, useState } from "react";
import {
	Animated,
	Easing,
	type NativeSyntheticEvent,
	Text,
	type TextLayoutEventData,
	View,
} from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

const NOTICE =
	"아래 내용은 사용자의 숭실대학교 유세인트 내용임을 ASSU가 보장합니다.";
const NOTICE_MEASURE_WIDTH = 1000;
const NOTICE_GAP = 32;

export function InfiniteNoticeMarquee() {
	const translateX = useRef(new Animated.Value(0)).current;
	const colorProgress = useRef(new Animated.Value(0)).current;
	const [segmentWidth, setSegmentWidth] = useState(0);

	useEffect(() => {
		if (segmentWidth === 0) return;

		translateX.setValue(0);
		const animation = Animated.loop(
			Animated.timing(translateX, {
				toValue: -segmentWidth,
				duration: segmentWidth * 18,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
		);
		animation.start();

		return () => animation.stop();
	}, [segmentWidth, translateX]);

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(colorProgress, {
					toValue: 1,
					duration: 3000,
					easing: Easing.inOut(Easing.sin),
					useNativeDriver: false,
				}),
				Animated.timing(colorProgress, {
					toValue: 0,
					duration: 3000,
					easing: Easing.inOut(Easing.sin),
					useNativeDriver: false,
				}),
			]),
		);
		animation.start();

		return () => animation.stop();
	}, [colorProgress]);

	const handleTextLayout = (
		event: NativeSyntheticEvent<TextLayoutEventData>,
	) => {
		const textWidth = event.nativeEvent.lines[0]?.width;
		if (textWidth) setSegmentWidth(Math.ceil(textWidth) + NOTICE_GAP);
	};

	const backgroundColor = colorProgress.interpolate({
		inputRange: [0, 1],
		outputRange: [colorTokens.primary, colorTokens.primaryOnDark],
	});

	const notice = (
		<View
			className="pr-[32px]"
			style={{ width: segmentWidth || NOTICE_MEASURE_WIDTH }}
		>
			<Text
				onTextLayout={segmentWidth ? undefined : handleTextLayout}
				className="text-[14px] font-medium leading-caption tracking-caption text-content-inverse"
			>
				{NOTICE}
			</Text>
		</View>
	);

	return (
		<Animated.View
			className="h-[35px] overflow-hidden py-[7px]"
			style={{ backgroundColor }}
		>
			<Animated.View
				className="flex-row"
				style={{ transform: [{ translateX }] }}
			>
				{notice}
				<View
					className="pr-[32px]"
					style={{ width: segmentWidth || NOTICE_MEASURE_WIDTH }}
				>
					<Text className="text-[14px] font-medium leading-caption tracking-caption text-content-inverse">
						{NOTICE}
					</Text>
				</View>
			</Animated.View>
		</Animated.View>
	);
}
