import { router } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";
import { useStudentStampQuery } from "@/entities/user/api/useStudentStampQuery";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { QRScannerButton } from "@/features/qr-auth/ui/QRScannerButton";
import { PartnerRankingList } from "@/widgets/partner-ranking/ui/PartnerRankingList";
import { StampBoard } from "@/widgets/stamp-board/ui/StampBoard";

export function StudentHomePage() {
	const basicInfo = useUserBasicInfo();
	const { data: studentProfile } = useStudentProfileQuery();
	const { data: stampData } = useStudentStampQuery();
	const userStampCount = stampData?.stamp ?? 0;
	const userName = studentProfile?.name ?? basicInfo?.name ?? "사용자";

	return (
		<ScrollView className="flex-1 bg-canvas px-5 pt-10">
			<Pressable
				className="rounded-lg bg-primary px-4 py-3"
				onPress={() => router.push("/")}
			>
				<Text className="text-sm font-semibold text-content-inverse">
					허브로 돌아가기
				</Text>
			</Pressable>
			<Text className="text-2xl font-bold mb-3">안녕하세요, {userName}님!</Text>
			<Text className="text-2xl font-bold mb-6">
				오늘은 어떤 할인을 받을까요?
			</Text>

			<QRScannerButton />
			<StampBoard currentCount={userStampCount} />

			<PartnerRankingList />
		</ScrollView>
	);
}
