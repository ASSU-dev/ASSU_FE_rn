import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function PartnerDashboardPage() {
	return (
		<View className="flex-1 items-center justify-center bg-canvas gap-gutter">
			<Text className="text-content-primary font-medium">업체 대시보드</Text>
			<Pressable
				onPress={() => router.push("/(protected)/partner/review")}
				className="bg-primary px-screen-m py-card-p rounded-md items-center"
			>
				<Text className="text-content-inverse font-semibold text-md">
					제휴 리뷰 보러가기
				</Text>
			</Pressable>
		</View>
	);
}
