import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Text, View } from "react-native";
import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";
import { useStudentStampQuery } from "@/entities/user/api/useStudentStampQuery";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useGetRecommendCurationQuery } from "@/features/home/api/useGetRecommendCurationQuery";
import { QRScannerButton } from "@/features/qr-auth/ui/QRScannerButton";
import { Logo } from "@/shared/assets/icons";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { HomeDiscountList } from "@/widgets/home/discount-list/ui/HomeDiscountList";
import { HomeRecommendedSection } from "@/widgets/home/recommended-section/ui/HomeRecommendedSection";
import { HomeTabSection } from "@/widgets/home/tab-section/ui/HomeTabSection";

export function StudentHomePage() {
	const basicInfo = useUserBasicInfo();
	const { data: studentProfile } = useStudentProfileQuery();
	const { data: stampData, refetch: refetchStamp } = useStudentStampQuery();
	const { data: curationData, isLoading: isCurationLoading } =
		useGetRecommendCurationQuery();
	const stampCount = stampData?.stamp ?? 0;
	const userName = studentProfile?.name ?? basicInfo?.name ?? "사용자";
	const curationResult = curationData?.result;
	const curationLists = curationResult?.curationLists;

	useFocusEffect(
		useCallback(() => {
			void refetchStamp();
		}, [refetchStamp]),
	);

	return (
		<PageLayout
			scrollable={true}
			withTopInset={true}
			withBottomInset={false}
			className="flex-1 bg-canvas"
			contentContainerClassName="pb-10"
			header={
				<View className="px-screen-m pt-4 pb-2">
					<Logo width={40} height={40} />
				</View>
			}
		>
			<View className="gap-6 px-screen-m">
				<View>
					<Text className="text-2xl font-bold">안녕하세요, {userName}님!</Text>
					<Text className="text-2xl font-bold">
						오늘은 어떤 할인을 받을까요?
					</Text>
				</View>
				<QRScannerButton />
			</View>

			<View className="mt-6 px-screen-m">
				<HomeTabSection stampCount={stampCount} />
			</View>

			<View className="mt-4">
				<HomeDiscountList />
			</View>

			<View className="mt-5 gap-8">
				<HomeRecommendedSection
					curationTitle={curationResult?.curationTitle}
					groupTitle={curationLists?.[0]?.groupTitle}
					stores={curationLists?.[0]?.stores}
					isLoading={isCurationLoading}
				/>
				<HomeRecommendedSection
					curationTitle={curationResult?.curationTitle}
					groupTitle={curationLists?.[1]?.groupTitle}
					stores={curationLists?.[1]?.stores}
					isLoading={isCurationLoading}
				/>
			</View>
		</PageLayout>
	);
}
