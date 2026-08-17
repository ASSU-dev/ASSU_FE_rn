import { Tabs } from "expo-router";
import { type ReactNode, useCallback, useEffect, useRef } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";
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
	const activeRouteRef = useRef("home");
	const navigationRef = useRef<{ navigate: (name: string) => void } | null>(
		null,
	);
	const exitConfirmRef = useRef(false);

	const handleBack = useCallback(() => {
		if (activeRouteRef.current !== "home") {
			navigationRef.current?.navigate("home");
			return true;
		}

		if (exitConfirmRef.current) {
			BackHandler.exitApp();
			return true;
		}

		exitConfirmRef.current = true;
		ToastAndroid.show(
			"뒤로 가기를 한 번 더 누르면 앱이 종료됩니다.",
			ToastAndroid.SHORT,
		);
		setTimeout(() => {
			exitConfirmRef.current = false;
		}, 2000);

		return true;
	}, []);

	useEffect(() => {
		if (Platform.OS !== "android") return;
		const subscription = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBack,
		);
		return () => subscription.remove();
	}, [handleBack]);

	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={({ state, navigation }) => {
				const activeRouteName = state.routes[state.index]?.name ?? "home";
				activeRouteRef.current = activeRouteName;
				navigationRef.current = navigation;
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
