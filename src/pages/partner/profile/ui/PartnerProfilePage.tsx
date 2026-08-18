import { useRouter } from "expo-router";
import { View } from "react-native";

import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import {
	ProfileImageActionSheet,
	useProfileImageEditor,
} from "@/features/profile-image-management";
import { PageLayout } from "@/shared/ui/layout";
import {
	type AccountMenuItemProps,
	AccountMenuSection,
	AccountProfileHeader,
} from "@/widgets/account-management";

export function PartnerProfilePage() {
	const router = useRouter();
	const basicInfo = useUserBasicInfo();
	const profileImageEditor = useProfileImageEditor();

	const myAccountItems: AccountMenuItemProps[] = [
		{
			label: "알림설정",
			iconName: "bell",
			onPress: () => router.push("../notification-settings"),
		},
		{
			label: "계정관리",
			iconName: "user",
			onPress: () => router.push("/(protected)/partner/account-management"),
		},
	];

	const customerServiceItems: AccountMenuItemProps[] = [
		{ label: "이용약관", iconName: "folder" },
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
					name={basicInfo?.name ?? "제휴업체"}
					subtitle="사업 수정"
					profileImage={profileImageEditor.imageSource}
					onProfileImagePress={profileImageEditor.open}
				/>

				<AccountMenuSection title="나의 계정 설정" items={myAccountItems} />
				<AccountMenuSection title="고객센터" items={customerServiceItems} />
			</View>
			<ProfileImageActionSheet
				visible={profileImageEditor.isOpen}
				hasImage={profileImageEditor.hasImage}
				isPending={profileImageEditor.isPending}
				onSelectImage={profileImageEditor.selectImage}
				onDeleteImage={profileImageEditor.removeImage}
				onClose={profileImageEditor.close}
			/>
		</PageLayout>
	);
}
