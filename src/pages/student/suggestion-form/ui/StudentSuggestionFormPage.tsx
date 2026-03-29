// 제휴 건의 폼 페이지 — 건의 대상, 희망 가게, 희망 혜택을 입력하고 제출하는 화면이다
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { SuggestionForm } from "./SuggestionForm";

export function StudentSuggestionFormPage() {
	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			{/* 헤더 */}
			<View className="flex-row items-center px-screen-m py-3 gap-[5px]">
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<Ionicons
						name="chevron-back"
						size={24}
						color={colorTokens.contentPrimary}
					/>
				</Pressable>
				<Text className="font-semibold text-xl text-content-primary">
					제휴 건의함
				</Text>
			</View>

			{/* 폼 */}
			<SuggestionForm />
		</PageLayout>
	);
}
