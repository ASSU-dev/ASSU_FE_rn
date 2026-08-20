import { Tabs } from "expo-router";
import { USER_TYPE } from "@/entities/user/model/types";
import { RoleBasedTabLayout } from "@/widgets/bottom-tab-bar/ui/RoleBasedTabLayout";

export default function PartnerTabLayout() {
	return (
		<RoleBasedTabLayout userType={USER_TYPE.PARTNER}>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="map" />
			<Tabs.Screen name="chat" />
			<Tabs.Screen name="profile" />
		</RoleBasedTabLayout>
	);
}
