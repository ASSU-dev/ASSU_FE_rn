import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { Dialog } from "@/shared/ui/dialog";
import { PageLayout } from "@/shared/ui/layout";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import {
	type AccountMenuItemProps,
	AccountMenuItem,
} from "@/widgets/account-management";

export function AdminAccountManagementPage() {
	const router = useRouter();
	const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

	const items: AccountMenuItemProps[] = [
		{ label: "차단 친구 관리", iconName: "ban" },
		{
			label: "차단 업체 관리",
			iconName: "ban",
			onPress: () => router.push("../blocked-partners"),
		},
		{ label: "로그아웃", iconName: "exitRight" },
		{
			label: "회원탈퇴",
			iconName: "user",
			onPress: () => setIsWithdrawalOpen(true),
		},
	];

	return (
		<PageLayout>
			<AppTopBar title="계정관리" />
			<View className="px-screen-m pt-[25px]">
				{items.map((item) => (
					<AccountMenuItem key={item.label} {...item} />
				))}
			</View>

			<Dialog
				visible={isWithdrawalOpen}
				onDismiss={() => setIsWithdrawalOpen(false)}
			>
				<Dialog.Title>정말로 회원 탈퇴 하시겠습니까?</Dialog.Title>
				<Dialog.Content>
					<Text className="text-sm text-content-secondary">
						탈퇴시, 개인정보는 파기되며, 복구가 불가능해요
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton onPress={() => setIsWithdrawalOpen(false)}>
						취소
					</Dialog.CancelButton>
					<Dialog.ConfirmButton onPress={() => setIsWithdrawalOpen(false)}>
						탈퇴하기
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</PageLayout>
	);
}
