import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

interface TopBarProps {
	title: string;
	onBack?: () => void;
	right?: ReactNode;
}

export function TopBar({ title, onBack, right }: TopBarProps) {
	return (
		<View className="flex-row items-center px-gutter py-[16px]">
			<Pressable onPress={onBack ?? (() => router.back())} hitSlop={8}>
				<BackArrowIcon width={24} height={24} color={colorTokens.contentPrimary} />
			</Pressable>
			<View className="flex-1 items-center">
				<Text className="text-[20px] font-semibold text-content-primary leading-caption tracking-caption">
					{title}
				</Text>
			</View>
			<View style={{ width: 24 }}>{right}</View>
		</View>
	);
}
