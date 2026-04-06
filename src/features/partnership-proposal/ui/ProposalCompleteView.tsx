import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorTokens } from "@/shared/styles/tokens";
import { PageLayout } from "@/shared/ui/layout";

export function ProposalCompleteView() {
	return (
		<PageLayout withTopInset contentContainerClassName="flex-1">
			<View className="px-6 pt-2">
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<Ionicons name="close" size={24} color={colorTokens.contentPrimary} />
				</Pressable>
			</View>

			<View className="flex-1 items-center justify-center gap-[20px]">
				<Text className="text-[30px] font-semibold text-content-primary">등록 완료</Text>
				<Text className="text-xl text-content-secondary">
					계약서는 확인을 거쳐 등록될 예정입니다!
				</Text>

				<Pressable
					className="bg-[#f4f4f5] rounded-lg px-[10px] py-[10px] mt-[11px]"
					onPress={() => router.back()}
				>
					<Text className="text-[13px] font-semibold text-content-secondary">계약서 확인하기</Text>
				</Pressable>
			</View>
		</PageLayout>
	);
}
