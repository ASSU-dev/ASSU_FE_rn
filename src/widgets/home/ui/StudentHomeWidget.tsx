import { Text, View } from "react-native";
import { QRScannerButton } from "@/features/qr-auth/ui/QRScannerButton";
import { Logo } from "@/shared/assets/icons";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import { HomeAdList } from "../ad-list/ui/HomeAdList";
import { HomeCurationSection } from "../curation-section/ui/HomeCurationSection";
import { useStudentHomeData } from "../model/useStudentHomeData";
import { HomeTabSection } from "../tab-section/ui/HomeTabSection";

export function StudentHomeWidget() {
	const {
		userName,
		stampCount,
		curationResult,
		curationLists,
		isCurationLoading,
	} = useStudentHomeData();

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
				<HomeAdList />
			</View>

			<View className="mt-5 gap-8">
				<HomeCurationSection
					curationTitle={curationResult?.curationTitle}
					groupTitle={curationLists?.[0]?.groupTitle}
					stores={curationLists?.[0]?.stores}
					isLoading={isCurationLoading}
				/>
				<HomeCurationSection
					curationTitle={curationResult?.curationTitle}
					groupTitle={curationLists?.[1]?.groupTitle}
					stores={curationLists?.[1]?.stores}
					isLoading={isCurationLoading}
				/>
			</View>
		</PageLayout>
	);
}
