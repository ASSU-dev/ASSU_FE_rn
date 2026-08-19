import { Text, View } from "react-native";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { PageLayout } from "@/shared/ui/layout/PageLayout";

const headingClassName =
	"text-[22px] font-semibold text-content-primary leading-caption tracking-caption";

export function PartnerDashboardPage() {
	const basicInfo = useUserBasicInfo();

	return (
		<PageLayout
			scrollable
			contentContainerClassName="px-screen-m gap-[30px] pt-10 pb-10"
		>
			<View className="gap-3 px-1">
				<Text className={headingClassName}>
					{basicInfo?.name ?? "제휴업체"}
				</Text>
				<Text className={headingClassName}>제휴 사용자가 얼마나 많을까요?</Text>
			</View>
		</PageLayout>
	);
}
