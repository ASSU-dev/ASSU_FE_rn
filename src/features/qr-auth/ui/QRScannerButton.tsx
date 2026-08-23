import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { BackArrowIcon, QrIcon } from "@/shared/assets/icons";
import { InfoLinkText } from "@/shared/ui/info";

export const QRScannerButton = () => {
	return (
		<Pressable
			className="flex-row items-center rounded-2xl bg-neutral px-6 py-8"
			onPress={() => router.push("/(protected)/student/partnership-auth")}
		>
			<View className="mr-4">
				<QrIcon width={40} height={40} />
			</View>
			<View className="flex-1">
				<Text className="text-lg font-bold text-content-primary">
					제휴 인증하기
				</Text>
				<InfoLinkText message="숭실대학교 학생인증이 완료된 사용자" />
			</View>
			<BackArrowIcon
				width={22}
				height={22}
				style={{ transform: [{ rotate: "180deg" }] }}
				color="#BDBDBD"
			/>
		</Pressable>
	);
};
