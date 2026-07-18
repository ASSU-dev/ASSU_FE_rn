import { useState } from "react";
import { Switch, Text, View } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { PageLayout } from "@/shared/ui/layout";

type NotificationOptionKey = "suggestion" | "proposal" | "chat";

const NOTIFICATION_OPTIONS: Array<{
	key: NotificationOptionKey;
	label: string;
}> = [
	{ key: "suggestion", label: "제휴건의 알림" },
	{ key: "proposal", label: "제휴제안 알림" },
	{ key: "chat", label: "채팅 알림" },
];

const INITIAL_SETTINGS: Record<NotificationOptionKey | "push", boolean> = {
	push: true,
	suggestion: true,
	proposal: true,
	chat: true,
};

export function AdminNotificationSettingsPage() {
	const [settings, setSettings] = useState(INITIAL_SETTINGS);

	const togglePush = () => {
		setSettings((current) =>
			current.push ? { ...current, push: false } : INITIAL_SETTINGS,
		);
	};

	const toggleOption = (key: NotificationOptionKey) => {
		setSettings((current) => ({ ...current, [key]: !current[key] }));
	};

	return (
		<PageLayout>
			<AppTopBar title="알림설정" />
			<View className="px-screen-m pt-[25px]">
				<View className="h-12 flex-row items-center justify-between px-gutter">
					<Text className="text-[15px] font-medium text-content-primary">
						PUSH 알림
					</Text>
					<Switch
						value={settings.push}
						onValueChange={togglePush}
						trackColor={{
							false: colorTokens.neutralVariant,
							true: colorTokens.primary,
						}}
						thumbColor={colorTokens.canvas}
					/>
				</View>
				{settings.push ? (
					<View className="mt-[13px]">
						{NOTIFICATION_OPTIONS.map((item) => (
							<View
								key={item.key}
								className="h-12 flex-row items-center justify-between px-gutter"
							>
								<Text className="text-[15px] font-medium text-content-primary">
									{item.label}
								</Text>
								<Switch
									value={settings[item.key]}
									onValueChange={() => toggleOption(item.key)}
									trackColor={{
										false: colorTokens.neutralVariant,
										true: colorTokens.primary,
									}}
									thumbColor={colorTokens.canvas}
								/>
							</View>
						))}
					</View>
				) : null}
			</View>
		</PageLayout>
	);
}
