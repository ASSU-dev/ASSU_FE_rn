import { Tabs } from "expo-router";
import type { ReactNode } from "react";
import type { UserType } from "@/entities/user/model/types";
import { BottomTabBar } from "./BottomTabBar";

interface RoleBasedTabLayoutProps {
	userType: UserType;
	children: ReactNode;
}

export function RoleBasedTabLayout({
	userType,
	children,
}: RoleBasedTabLayoutProps) {
	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={({ state, navigation }) => {
				const activeRouteName = state.routes[state.index]?.name ?? "home";
				return (
					<BottomTabBar
						userType={userType}
						activeRouteName={activeRouteName}
						onTabPress={(routeName) => navigation.navigate(routeName)}
					/>
				);
			}}
		>
			{children}
		</Tabs>
	);
}
