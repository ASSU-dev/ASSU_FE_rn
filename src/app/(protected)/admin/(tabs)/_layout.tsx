import { Tabs } from "expo-router";
import { USER_TYPE } from "@/entities/user/model/types";
import { RoleBasedTabLayout } from "@/widgets/bottom-tab-bar/ui/RoleBasedTabLayout";

export default function AdminTabLayout() {
	return (
		<RoleBasedTabLayout userType={USER_TYPE.ADMIN}>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="map" />
			<Tabs.Screen name="dashboard" />
			<Tabs.Screen name="chat" />
			<Tabs.Screen name="profile" />
		</RoleBasedTabLayout>
	);
}
