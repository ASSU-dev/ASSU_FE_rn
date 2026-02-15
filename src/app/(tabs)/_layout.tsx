import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: () => null,
				}}
			/>
			<Tabs.Screen
				name="playground"
				options={{
					title: "playground",
					tabBarIcon: () => null,
				}}
			/>
		</Tabs>
	);
}
