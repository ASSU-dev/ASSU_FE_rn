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
		<View className="relative z-50 flex-row items-center justify-center px-6 pt-7 pb-4">
			<Pressable
				hitSlop={8}
				onPress={onBack ?? (() => router.back())}
				className="absolute left-6"
			>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>

			<Text className="text-lg font-semibold text-content-primary">
				{roomName}
			</Text>

			{actions ? (
				<View className="absolute right-6 z-50">{actions}</View>
			) : null}
		</View>
	);
}
