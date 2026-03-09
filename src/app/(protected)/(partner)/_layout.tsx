import { Tabs } from "expo-router";
import { BottomTabBar } from "@/widgets/bottom-tab-bar/ui/BottomTabBar";

export default function PartnerTabLayout() {
	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={({ state, navigation }) => {
				const activeRouteName = state.routes[state.index]?.name ?? "home";
				return (
					<BottomTabBar
						userType="PARTNER"
						activeRouteName={activeRouteName}
						onTabPress={(routeName) => navigation.navigate(routeName)}
					/>
				);
			}}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="map" />
			<Tabs.Screen name="dashboard" />
			<Tabs.Screen name="chat" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
