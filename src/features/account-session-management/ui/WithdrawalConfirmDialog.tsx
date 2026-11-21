import { Text } from "react-native";

import { Dialog } from "@/shared/ui/dialog";

interface WithdrawalConfirmDialogProps {
	visible: boolean;
	isPending: boolean;
	onConfirm: () => void;
	onClose: () => void;
}

export function WithdrawalConfirmDialog({
	visible,
	isPending,
	onConfirm,
	onClose,
}: WithdrawalConfirmDialogProps) {
	return (
		<Dialog visible={visible} onDismiss={onClose}>
			<Dialog.Title>회원 탈퇴</Dialog.Title>
			<Dialog.Content>
				<Text className="text-sm text-content-secondary">
					탈퇴하면 계정이 비활성화되고 한 달 후 완전히 삭제됩니다.
					탈퇴하시겠어요?
				</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Dialog.CancelButton disabled={isPending} onPress={onClose}>
					취소
				</Dialog.CancelButton>
				<Dialog.ConfirmButton disabled={isPending} onPress={onConfirm}>
					회원 탈퇴
				</Dialog.ConfirmButton>
			</Dialog.Actions>
		</Dialog>
	);
}
