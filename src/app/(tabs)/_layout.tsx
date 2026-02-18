import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import type { UserType } from "@/entities/user/model/types";
import { BottomTabBar } from "@/widgets/bottom-tab-bar/ui/BottomTabBar";

// TODO: 추후 useAuthStore((s) => s.userType) 로 교체
const TEMP_USER_TYPE: UserType = "company";

function TabBarAdapter({ state, navigation }: BottomTabBarProps) {
	const activeRouteName = state.routes[state.index]?.name ?? "index";

	return (
		<BottomTabBar
			userType={TEMP_USER_TYPE}
			activeRouteName={activeRouteName}
			onTabPress={(routeName) => navigation.navigate(routeName)}
		/>
	);
}

export default function TabLayout() {
	return (
		<Tabs
			tabBar={(props) => <TabBarAdapter {...props} />}
			screenOptions={{ headerShown: false }}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="nearby" />
			<Tabs.Screen name="coupons" />
			<Tabs.Screen name="dashboard" />
			<Tabs.Screen name="chat" />
			<Tabs.Screen name="account" />
		</Tabs>
	);
}
