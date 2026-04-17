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
		<View className="flex-row items-center px-screen-m pt-7 pb-4">
			<Pressable hitSlop={8} onPress={onBack ?? (() => router.back())}>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
			<Text className="flex-1 text-center text-lg font-semibold text-content-primary">
				{title}
			</Text>
			<View style={{ width: 24 }} />
		</View>
	);
}
