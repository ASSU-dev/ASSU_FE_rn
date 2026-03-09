import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function IndexPage() {
	return (
		<View className="flex-1 justify-center bg-canvas px-6">
			<Text className="mb-2 text-2xl font-bold text-content-primary">
				개발용 라우트 허브
			</Text>
			<Text className="mb-8 text-sm font-regular text-content-secondary">
				로그인 가드 없이 역할별 페이지로 바로 이동합니다.
			</Text>

			<Pressable
				className="mb-3 items-center rounded-lg bg-primary py-4"
				onPress={() => router.push("/(protected)/(student)/home")}
			>
				<Text className="text-sm font-semibold text-white">학생 홈으로 이동</Text>
			</Pressable>

			<Pressable
				className="mb-3 items-center rounded-lg bg-primary py-4"
				onPress={() => router.push("/(protected)/(admin)/home")}
			>
				<Text className="text-sm font-semibold text-white">관리자 홈으로 이동</Text>
			</Pressable>

			<Pressable
				className="mb-6 items-center rounded-lg bg-primary py-4"
				onPress={() => router.push("/(protected)/(partner)/home")}
			>
				<Text className="text-sm font-semibold text-white">제휴업체 홈으로 이동</Text>
			</Pressable>

			<Pressable
				className="mb-3 items-center rounded-lg bg-primary-tint py-4"
				onPress={() => router.push("/(auth)/login")}
			>
				<Text className="text-sm font-semibold text-primary">로그인 페이지 이동</Text>
			</Pressable>

			<Pressable
				className="items-center rounded-lg bg-primary-tint py-4"
				onPress={() => router.push("/(auth)/register")}
			>
				<Text className="text-sm font-semibold text-primary">
					회원가입 페이지 이동
				</Text>
			</Pressable>
		</View>
	);
}
