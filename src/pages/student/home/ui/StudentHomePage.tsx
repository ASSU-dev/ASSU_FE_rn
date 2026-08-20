import { Text, View } from "react-native";
import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";
import { useStudentStampQuery } from "@/entities/user/api/useStudentStampQuery";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { QRScannerButton } from "@/features/qr-auth/ui/QRScannerButton";
import { Logo } from "@/shared/assets/icons";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { PartnerRankingList } from "@/widgets/partner-ranking/ui/PartnerRankingList";
import { StampBoard } from "@/widgets/stamp-board/ui/StampBoard";

export function StudentHomePage() {
	const basicInfo = useUserBasicInfo();
	const { data: studentProfile } = useStudentProfileQuery();
	const { data: stampData } = useStudentStampQuery();
	const userStampCount = stampData?.stamp ?? 0;
	const userName = studentProfile?.name ?? basicInfo?.name ?? "사용자";

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-canvas"
			contentContainerClassName="px-screen-m pb-10"
			header={
				<View className="px-screen-m pt-4 pb-2">
					<Logo width={40} height={40} />
				</View>
			}
		>
			<Text className="text-2xl font-bold mb-3">안녕하세요, {userName}님!</Text>
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
		</PageLayout>
	);
}
