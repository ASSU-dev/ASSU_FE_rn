import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function LoginPage() {
	return (
		<View className="flex-1 items-center justify-center bg-canvas">
			<Text className="mb-4 text-content-primary font-medium">로그인</Text>
			<Pressable
				className="rounded-lg bg-primary px-4 py-3"
				onPress={() => router.push("/")}
			>
				<Text className="text-sm font-semibold text-white">허브로 돌아가기</Text>
			</Pressable>
		</View>
	);
}
