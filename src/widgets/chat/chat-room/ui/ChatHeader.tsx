import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

interface ChatHeaderProps {
	roomName: string;
	onBack?: () => void;
	actions?: ReactNode;
}

export function ChatHeader({ roomName, onBack, actions }: ChatHeaderProps) {
	return (
		<View className="relative z-50 bg-canvas flex-row items-center px-screen-m py-4 mt-3">
			<Pressable hitSlop={8} onPress={onBack ?? (() => router.back())}>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>

			<View
				className="absolute inset-0 items-center justify-center"
				pointerEvents="none"
			>
				<Text
					className="text-lg font-semibold text-content-primary"
					style={{ includeFontPadding: false }}
				>
					{roomName}
				</Text>
			</View>

			<View className="flex-1" />

			{actions && <View className="z-50">{actions}</View>}
		</View>
	);
}
