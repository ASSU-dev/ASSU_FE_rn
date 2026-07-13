import { useLocalSearchParams, useRouter } from "expo-router";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { useInquiryDetail } from "../api/useInquiryDetail";

export function InquiryDetailPage() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data, isLoading, isError, error } = useInquiryDetail(id ?? "");

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			{/* Header */}
			<View className="flex-row items-center gap-[12px] px-[24px] py-[24px]">
				<Pressable onPress={() => router.back()} className="w-6 h-6">
					<BackArrowIcon width={24} height={24} />
				</Pressable>
				<View className="flex-1 items-center">
					<Text className="text-xl font-semibold text-content-primary">
						문의내역
					</Text>
				</View>
				<View className="w-6" />
			</View>

			{isLoading && (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator color={colorTokens.primary} size="large" />
				</View>
			)}

			{isError && (
				<View className="flex-1 items-center justify-center gap-2">
					<Text className="text-base font-semibold text-danger">
						문의를 불러오는데 실패했습니다.
					</Text>
					<Text className="text-sm text-content-secondary">
						{error instanceof Error ? error.message : "다시 시도해주세요."}
					</Text>
				</View>
			)}

			{data && (
				<ScrollView contentContainerClassName="px-6 pt-7 pb-10">
					{/* 제목 + 날짜 */}
					<View className="items-center gap-0.5 mb-6">
						<Text className="text-[18px] font-semibold text-content-primary tracking-[0.25px] text-center">
							{data.title}
						</Text>
						<Text className="text-[13px] text-content-secondary tracking-[-0.32px]">
							{data.createdAt}
						</Text>
					</View>

					{/* 구분선 */}
					<View className="border-b border-neutral-variant mb-6" />

					{/* 본문 */}
					<Text className="text-[15px] text-content-primary tracking-[0.25px] leading-5 mb-16">
						{data.content}
					</Text>

					{/* 답변 섹션 */}
					<View className="gap-2.5">
						<View className="px-4">
							<Text className="text-[15px] font-medium text-primary tracking-[0.25px] leading-5">
								Answer
							</Text>
						</View>
						<View className="bg-neutral rounded-lg p-4">
							{data.answer ? (
								<Text className="text-[11px] font-medium text-content-primary tracking-[0.25px] leading-[20px]">
									{data.answer}
								</Text>
							) : (
								<Text className="text-[11px] text-content-secondary tracking-[0.25px] leading-[20px]">
									아직 답변이 등록되지 않았습니다.
								</Text>
							)}
						</View>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}
