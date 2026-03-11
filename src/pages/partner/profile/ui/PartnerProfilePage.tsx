import { View } from "react-native";

import { PageLayout } from "@/shared/ui/layout";
import {
	AccountMenuSection,
	AccountProfileHeader,
	type AccountMenuItemProps,
} from "@/widgets/account-management";

const myAccountItems: AccountMenuItemProps[] = [
	{ label: "알림설정", iconName: "notifications-outline" },
	{ label: "계정관리", iconName: "person-outline" },
];

const customerServiceItems: AccountMenuItemProps[] = [
	{ label: "이용약관", iconName: "document-outline" },
	{ label: "고객센터", iconName: "headset-outline" },
];

export function PartnerProfilePage() {
	return (
		<PageLayout
			scrollable
			contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 120 }}
		>
			<View className="gap-8">
				<AccountProfileHeader name="역전할머니맥주 숭실대점" subtitle="사업 수정" />

				<AccountMenuSection title="나의 계정 설정" items={myAccountItems} />
				<AccountMenuSection title="고객센터" items={customerServiceItems} />
			</View>
		</PageLayout>
	);
}
