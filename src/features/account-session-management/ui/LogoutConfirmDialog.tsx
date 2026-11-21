import { Text } from "react-native";

import { Dialog } from "@/shared/ui/dialog";

interface LogoutConfirmDialogProps {
	visible: boolean;
	isPending: boolean;
	onConfirm: () => void;
	onClose: () => void;
}

export function LogoutConfirmDialog({
	visible,
	isPending,
	onConfirm,
	onClose,
}: LogoutConfirmDialogProps) {
	return (
		<Dialog visible={visible} onDismiss={onClose}>
			<Dialog.Title>로그아웃</Dialog.Title>
			<Dialog.Content>
				<Text className="text-sm text-content-secondary">
					로그아웃하시겠어요?
				</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Dialog.CancelButton disabled={isPending} onPress={onClose}>
					취소
				</Dialog.CancelButton>
				<Dialog.ConfirmButton disabled={isPending} onPress={onConfirm}>
					로그아웃
				</Dialog.ConfirmButton>
			</Dialog.Actions>
		</Dialog>
	);
}
