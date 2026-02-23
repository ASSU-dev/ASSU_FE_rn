import { useEffect, useRef, useState } from "react";
import { Animated, Easing, type LayoutChangeEvent } from "react-native";
import type { TabBarTab } from "./types";

const ANIMATION_DURATION_MS = 200;

export function useTabBarUnderlineAnimation(tabs: TabBarTab[], activeTab: string) {
	const [containerWidth, setContainerWidth] = useState(0);
	const translateX = useRef(new Animated.Value(0)).current;
	const isInitialMount = useRef(true);

	const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
	const tabWidth = containerWidth > 0 ? containerWidth / tabs.length : 0;
	const targetTranslateX = activeIndex >= 0 ? activeIndex * tabWidth : 0;

	useEffect(() => {
		if (tabWidth <= 0) return;
		if (isInitialMount.current) {
			isInitialMount.current = false;
			translateX.setValue(targetTranslateX);
		} else {
			Animated.timing(translateX, {
				toValue: targetTranslateX,
				duration: ANIMATION_DURATION_MS,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}).start();
		}
	}, [translateX, targetTranslateX, tabWidth]);

	const handleLayout = (e: LayoutChangeEvent) => {
		setContainerWidth(e.nativeEvent.layout.width);
	};

	return { tabWidth, translateX, handleLayout };
}
