import { useRouter } from "expo-router";
import { View } from "react-native";

import { useStudentProfileQuery } from "@/entities/user/api/useStudentProfileQuery";
import { formatProfileSubtitle } from "@/entities/user/lib/formatProfileSubtitle";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useAccountSessionActions } from "@/features/account-session-management";
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

export function StudentProfilePage() {
	const router = useRouter();
	const basicInfo = useUserBasicInfo();
	const { data: studentProfile } = useStudentProfileQuery();
	const profileImageEditor = useProfileImageEditor();
	const accountSession = useAccountSessionActions();

	const myAccountItems: AccountMenuItemProps[] = [
		{
			label: "로그아웃",
			iconName: "exitRight",
			onPress: accountSession.requestLogout,
		},
		{
			label: "회원 탈퇴",
			iconName: "user",
			onPress: accountSession.requestWithdrawal,
		},
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
					name={studentProfile?.name ?? basicInfo?.name ?? "사용자"}
					subtitle={formatProfileSubtitle(studentProfile ?? basicInfo)}
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
