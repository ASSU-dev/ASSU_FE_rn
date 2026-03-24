// 제휴 건의 제출 완료 페이지 — 폼 제출 후 이동하는 완료 확인 화면

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout/PageLayout";

export function StudentSuggestionCompletePage() {
	return (
		<PageLayout contentContainerClassName="flex-1">
			<Pressable
				className="absolute left-screen-m top-3 z-10"
				onPress={() => router.dismissAll()}
				hitSlop={8}
			>
				<Ionicons name="close" size={24} color={colorTokens.contentPrimary} />
			</Pressable>

			<View className="flex-1 items-center justify-center gap-[16px]">
				<Text className="text-[20px] font-regular leading-body tracking-caption text-content-secondary">
					제출 완료됐습니다
				</Text>
				<View className="items-center gap-5">
					<Text className="text-[1.875rem] leading-[1.875rem] font-semibold tracking-caption text-content-primary">
						소중한 의견
					</Text>
					<Text className="text-[1.875rem] leading-[1.875rem] font-semibold tracking-caption text-content-primary">
						감사합니다!
					</Text>
				</View>
			</View>
		</PageLayout>
	);
}
