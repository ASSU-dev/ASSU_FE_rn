import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

interface AppTopBarProps {
	title: string;
	onBack?: () => void;
}

export function AppTopBar({ title, onBack }: AppTopBarProps) {
	return (
		<View className="relative flex-row items-center justify-center px-screen-m py-4 mt-3">
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
			<Text
				className="text-xl font-semibold text-content-primary"
				style={{ includeFontPadding: false }}
			>
				{title}
			</Text>
		</View>
	);
}
