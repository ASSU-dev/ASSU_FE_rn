import { useRouter } from "expo-router";
import { View } from "react-native";

import { PageLayout } from "@/shared/ui/layout";
import {
	type AccountMenuItemProps,
	AccountMenuSection,
	AccountProfileHeader,
} from "@/widgets/account-management";

export function StudentProfilePage() {
	const router = useRouter();

	const myAccountItems: AccountMenuItemProps[] = [
		{ label: "내가 작성한 리뷰", iconName: "writing" },
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
			contentContainerStyle={{
				paddingHorizontal: 24,
				paddingTop: 28,
				paddingBottom: 120,
			}}
		>
			<View className="gap-8">
				<AccountProfileHeader
					name="김승실"
					subtitle="숭실대학교 IT대학 글로벌미디어학부"
				/>

				<AccountMenuSection title="나의 계정 설정" items={myAccountItems} />
				<AccountMenuSection title="고객센터" items={customerServiceItems} />
			</View>
		</PageLayout>
	);
}
