import { Tabs } from "expo-router";
import { BottomTabBar } from "@/widgets/bottom-tab-bar/ui/BottomTabBar";

export default function StudentTabLayout() {
	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={({ state, navigation }) => {
				const activeRouteName = state.routes[state.index]?.name ?? "home";
				return (
					<BottomTabBar
						userType="STUDENT"
						activeRouteName={activeRouteName}
						onTabPress={(routeName) => navigation.navigate(routeName)}
					/>
				);
			}}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="map" />
			<Tabs.Screen name="suggestion" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
