import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { usePartnershipAuthStore } from "@/features/partnership-auth";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipCompletePage() {
	const { benefit } = useLocalSearchParams<{ benefit: string }>();
	const benefitText = benefit?.replace(/^.*?,\s*/, "") ?? "혜택";
	const resetPartnershipAuth = usePartnershipAuthStore((state) => state.reset);

	const goHome = () => {
		resetPartnershipAuth();
		router.replace("/(protected)/student/(tabs)/home");
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			<Pressable
				onPress={goHome}
				hitSlop={8}
				className="ml-screen-m mt-[9px] size-6 items-center justify-center"
			>
				<Ionicons name="close" size={24} />
			</Pressable>

			<View className="w-full flex-1 items-center justify-center px-screen-m pb-[40px]">
				<View className="w-full items-center gap-[11px]">
					<Text className="w-full text-center text-[25px] font-semibold leading-[32px] tracking-caption text-content-primary">
						제휴인증 완료
					</Text>
					<Text className="w-full text-center text-lg font-regular leading-caption tracking-caption text-content-secondary">
						{benefitText} 혜택이 제공됩니다
					</Text>
				</View>

				<Pressable
					onPress={goHome}
					className="mt-[25px] rounded-[8px] bg-neutral p-gutter"
				>
					<Text className="text-sm font-semibold leading-caption tracking-caption text-content-secondary">
						홈으로 돌아가기
					</Text>
				</Pressable>
			</View>
		</PageLayout>
	);
}
