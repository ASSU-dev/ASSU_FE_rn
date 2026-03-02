import { Animated, Pressable, Text, View } from "react-native";
import type { TabBarProps } from "./types";
import { useTabBarUnderlineAnimation } from "./useTabBarUnderlineAnimation";

export function TabBar({ tabs, activeTab, onTabChange, testID }: TabBarProps) {
	const { tabWidth, translateX, handleLayout } = useTabBarUnderlineAnimation(
		tabs,
		activeTab,
	);

	return (
		<View testID={testID} onLayout={handleLayout}>
			<View className="flex-row">
				{tabs.map((tab) => {
					const active = activeTab === tab.id;
					return (
						<Pressable
							key={tab.id}
							className="flex-1 items-center py-3"
							onPress={() => onTabChange(tab.id)}
						>
							<Text
								className={`font-regular ${
									active ? "text-content-primary" : "text-content-secondary"
								}`}
								numberOfLines={1}
							>
								{tab.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
			<View className="relative h-[2px] w-full">
				{tabWidth > 0 && (
					<Animated.View
						className="absolute left-0 top-0 h-[2px] bg-content-primary"
						style={{
							width: tabWidth,
							transform: [{ translateX }],
						}}
					/>
				)}
			</View>
		</View>
	);
}
