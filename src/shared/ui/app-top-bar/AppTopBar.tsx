import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

interface AppTopBarProps {
	title: string;
	onBack?: () => void;
	titleAlign?: "left" | "center";
}

export function AppTopBar({
	title,
	onBack,
	titleAlign = "center",
}: AppTopBarProps) {
	const isLeft = titleAlign === "left";
	return (
		<View className="relative flex-row items-center justify-center px-screen-m py-4 mt-3">
			<Pressable
				hitSlop={4}
				onPress={onBack ?? (() => router.back())}
				className="absolute left-gutter z-10 h-12 w-12 items-center justify-center"
			>
				<BackArrowIcon
					width={24}
					height={24}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
			<View
				className={`flex-1 ${isLeft ? "items-start pl-8" : "items-center"}`}
			>
				<Text className="text-xl font-semibold text-content-primary">
					{title}
				</Text>
			</View>
		</View>
	);
}
