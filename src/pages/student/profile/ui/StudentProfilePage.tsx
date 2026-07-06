import type { ImageSource } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { useProfileImageQuery } from "@/entities/user/api/useProfileImageQuery";
import { formatProfileSubtitle } from "@/entities/user/lib/formatProfileSubtitle";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { PageLayout } from "@/shared/ui/layout";
import {
	type AccountMenuItemProps,
	AccountMenuSection,
	AccountProfileHeader,
} from "@/widgets/account-management";

export function StudentProfilePage() {
	const router = useRouter();
	const basicInfo = useUserBasicInfo();
	const { data: profileImage } = useProfileImageQuery();
	const profileImageSource: ImageSource | undefined = profileImage?.url
		? { uri: profileImage.url }
		: undefined;

	const myAccountItems: AccountMenuItemProps[] = [
		{
			label: "내가 작성한 리뷰",
			iconName: "writing",
			onPress: () => router.push("../my-reviews"),
		},
		{ label: "로그아웃", iconName: "exitRight" },
	];

	const customerServiceItems: AccountMenuItemProps[] = [
		{ label: "개인정보 처리방침 안내", iconName: "folder" },
		{
			label: "자주 묻는 질문",
			iconName: "speechBubble",
			onPress: () => router.push("../faq"),
		},
		{
			label: "고객센터",
			iconName: "headphone",
			onPress: () => router.push("../customer-service"),
		},
	];

	return (
		<PageLayout
			scrollable
			contentContainerClassName="px-screen-m pt-[28px] pb-[120px]"
		>
			<View className="gap-8">
				<AccountProfileHeader
					name={basicInfo?.name ?? "사용자"}
					subtitle={formatProfileSubtitle(basicInfo)}
					profileImage={profileImageSource}
				/>

				<AccountMenuSection title="나의 계정 설정" items={myAccountItems} />
				<AccountMenuSection title="고객센터" items={customerServiceItems} />
			</View>
		</PageLayout>
	);
}
