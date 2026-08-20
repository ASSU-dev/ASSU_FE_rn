import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";
import { useStudentStampQuery } from "@/entities/user/api/useStudentStampQuery";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { QRScannerButton } from "@/features/qr-auth/ui/QRScannerButton";
import { Logo, NotificationBellIcon } from "@/shared/assets/icons";
import { PartnerRankingList } from "@/widgets/partner-ranking/ui/PartnerRankingList";
import { StampBoard } from "@/widgets/stamp-board/ui/StampBoard";

export function StudentHomePage() {
	const basicInfo = useUserBasicInfo();
	const { data: studentProfile } = useStudentProfileQuery();
	const { data: stampData, refetch: refetchStamp } = useStudentStampQuery();
	const userStampCount = stampData?.stamp ?? 0;

	useFocusEffect(
		useCallback(() => {
			void refetchStamp();
		}, [refetchStamp]),
	);
	const userName = studentProfile?.name ?? basicInfo?.name ?? "사용자";

	return (
		<SafeAreaView edges={["top"]} className="flex-1 bg-canvas">
			<ScrollView
				className="flex-1 bg-canvas"
				contentContainerClassName="px-screen-m pb-10"
			>
				<View className="flex-row items-center justify-between py-4">
					<Logo width={40} height={40} />
					<View className="relative h-6 w-6">
						<NotificationBellIcon width={24} height={24} />
						<View className="absolute right-0 top-px h-1 w-1 rounded-[999px] bg-danger" />
					</View>
				</View>

				<Text className="text-2xl font-bold mb-3">
					안녕하세요, {userName}님!
				</Text>
				<Text className="text-2xl font-bold mb-6">
					오늘은 어떤 할인을 받을까요?
				</Text>

				<View className="gap-6">
					<QRScannerButton />
					<StampBoard currentCount={userStampCount} />
				</View>

				<View className="mt-10">
					<PartnerRankingList />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
