import { useState } from "react";
import { Switch, Text, View } from "react-native";

import { colorTokens } from "@/shared/styles/tokens";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { PageLayout } from "@/shared/ui/layout";

type NotificationSettingKey = "push" | "suggestion" | "proposal" | "chat";

const NOTIFICATION_ITEMS: Array<{
	key: NotificationSettingKey;
	label: string;
}> = [
	{ key: "push", label: "PUSH 알림" },
	{ key: "suggestion", label: "제휴건의 알림" },
	{ key: "proposal", label: "제휴제안 알림" },
	{ key: "chat", label: "채팅 알림" },
];

const INITIAL_SETTINGS: Record<NotificationSettingKey, boolean> = {
	push: true,
	suggestion: true,
	proposal: true,
	chat: true,
};

export function AdminNotificationSettingsPage() {
	const [settings, setSettings] = useState(INITIAL_SETTINGS);

	const toggleSetting = (key: NotificationSettingKey) => {
		setSettings((current) => {
			const nextValue = !current[key];
			if (key === "push") {
				return {
					push: nextValue,
					suggestion: nextValue,
					proposal: nextValue,
					chat: nextValue,
				};
			}

			const next = { ...current, [key]: nextValue };
			return {
				...next,
				push: next.suggestion || next.proposal || next.chat,
			};
		});
	};

	return (
		<PageLayout>
			<AppTopBar title="알림설정" />
			<View className="px-screen-m pt-[25px]">
				{NOTIFICATION_ITEMS.map((item, index) => (
					<View
						key={item.key}
						className={`h-12 flex-row items-center justify-between px-gutter ${index === 1 ? "mt-[13px]" : ""}`}
					>
						<Text className="text-[15px] font-medium text-content-primary">
							{item.label}
						</Text>
						<Switch
							value={settings[item.key]}
							onValueChange={() => toggleSetting(item.key)}
							trackColor={{
								false: colorTokens.neutralVariant,
								true: colorTokens.primary,
							}}
							thumbColor={colorTokens.canvas}
						/>
					</View>
				))}
			</View>
		</PageLayout>
	);
}
