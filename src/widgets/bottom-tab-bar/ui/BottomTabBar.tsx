import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { UserType } from "@/entities/user/model/types";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
import { TAB_CONFIG } from "../model/tabConfig";
import { BottomTabItem } from "./BottomTabItem";

interface BottomTabBarProps {
	userType: UserType;
	activeRouteName: string;
	onTabPress: (routeName: string) => void;
}

export function BottomTabBar({
	userType,
	activeRouteName,
	onTabPress,
}: BottomTabBarProps) {
	const insets = useSafeAreaInsets();
	const tabs = TAB_CONFIG[userType];

	return (
		<View
			className="flex-row bg-canvas"
			style={[
				shadows.primary,
				{
					borderTopWidth: StyleSheet.hairlineWidth,
					borderTopColor: colorTokens.contentSecondaryAlpha30,
					paddingTop: 5,
					paddingHorizontal: 10,
					paddingBottom: insets.bottom + 7,
				},
			]}
		>
			{tabs.map((tab) => (
				<BottomTabItem
					key={tab.route}
					label={tab.label}
					activeIconName={tab.activeIconName}
					inactiveIconName={tab.inactiveIconName}
					isActive={activeRouteName === tab.route}
					onPress={() => onTabPress(tab.route)}
				/>
			))}
		</View>
	);
}
