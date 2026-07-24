import { Text, View } from "react-native";

import { Toggle } from "@/shared/ui/toggle";

import type { NotificationRole } from "../model/types";
import { useNotificationSettings } from "../model/useNotificationSettings";

interface NotificationToggleListProps {
	userRole: NotificationRole;
}

function ToggleRow({
	label,
	value,
	onValueChange,
}: {
	label: string;
	value: boolean;
	onValueChange: () => void;
}) {
	return (
		<View className="flex-row items-center justify-between px-2.5 py-4">
			<Text className="text-[15px] text-content-primary">{label}</Text>
			<Toggle
				value={value}
				onValueChange={onValueChange}
				width={40}
				height={25}
			/>
		</View>
	);
}

export function NotificationToggleList({
	userRole,
}: NotificationToggleListProps) {
	const {
		parent,
		children,
		childSettings,
		isPushEnabled,
		togglePush,
		toggleChild,
	} = useNotificationSettings(userRole);

	return (
		<View className="px-screen-m">
			<ToggleRow
				label={parent.label}
				value={isPushEnabled}
				onValueChange={togglePush}
			/>
			<View className="h-4" />
			{children.map((item) => (
				<ToggleRow
					key={item.key}
					label={item.label}
					value={childSettings[item.key]}
					onValueChange={() => toggleChild(item.key)}
				/>
			))}
		</View>
	);
}
