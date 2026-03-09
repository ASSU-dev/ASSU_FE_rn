import { Tabs } from "expo-router";
import { RoleBasedTabLayout } from "@/widgets/bottom-tab-bar/ui/RoleBasedTabLayout";

export default function StudentTabLayout() {
	return (
		<RoleBasedTabLayout userType="STUDENT">
			<Tabs.Screen name="home" />
			<Tabs.Screen name="map" />
			<Tabs.Screen name="suggestion" />
			<Tabs.Screen name="profile" />
		</RoleBasedTabLayout>
	);
}
