import { useState } from "react";
import { Text, View } from "react-native";

import { useAccountSessionActions } from "@/features/account-session-management";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { Dialog } from "@/shared/ui/dialog";
import { PageLayout } from "@/shared/ui/layout";

import type { AccountMenuItemProps } from "../model/types";
import { AccountMenuItem } from "./AccountMenuItem";

interface AccountManagementContentProps {
	onBlockedPartnersPress: () => void;
}

export function AccountManagementContent({
	onBlockedPartnersPress,
}: AccountManagementContentProps) {
	const accountSession = useAccountSessionActions();
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);
	const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

	function handleLogout() {
		setIsLogoutOpen(false);
		accountSession.executeLogout();
	}

	function handleWithdrawal() {
		setIsWithdrawalOpen(false);
		accountSession.executeWithdrawal();
	}

	const items: AccountMenuItemProps[] = [
		{
			label: "차단 업체 관리",
			iconName: "ban",
			onPress: onBlockedPartnersPress,
		},
		{
			label: "로그아웃",
			iconName: "exitRight",
			onPress: () => setIsLogoutOpen(true),
		},
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

			<Dialog visible={isLogoutOpen} onDismiss={() => setIsLogoutOpen(false)}>
				<Dialog.Title>로그아웃하시겠습니까?</Dialog.Title>
				<Dialog.Content>
					<Text className="text-sm text-content-secondary">
						로그아웃하면 회원가입 화면으로 이동합니다.
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton
						disabled={accountSession.isPending}
						onPress={() => setIsLogoutOpen(false)}
					>
						취소
					</Dialog.CancelButton>
					<Dialog.ConfirmButton
						disabled={accountSession.isPending}
						onPress={handleLogout}
					>
						로그아웃
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>

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
					<Dialog.CancelButton
						disabled={accountSession.isPending}
						onPress={() => setIsWithdrawalOpen(false)}
					>
						취소
					</Dialog.CancelButton>
					<Dialog.ConfirmButton
						disabled={accountSession.isPending}
						onPress={handleWithdrawal}
					>
						탈퇴하기
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</PageLayout>
	);
}
