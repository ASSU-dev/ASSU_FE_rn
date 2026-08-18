import { Text } from "react-native";

import { Dialog } from "@/shared/ui/dialog";

import { BLOCK_USER_DIALOG } from "../model/constants";
import type { useBlockDialog } from "../model/useBlockDialog";

interface BlockUserDialogProps {
	partnerName: string;
	state: ReturnType<typeof useBlockDialog>;
}

export function BlockUserDialog({ partnerName, state }: BlockUserDialogProps) {
	const {
		confirmVisible,
		successVisible,
		closeConfirm,
		handleConfirm,
		closeSuccess,
		isSubmitting,
		errorMessage,
	} = state;
	const { confirm, success } = BLOCK_USER_DIALOG;

	return (
		<>
			<Dialog visible={confirmVisible} onDismiss={closeConfirm}>
				<Dialog.Title>{confirm.title}</Dialog.Title>
				<Dialog.Content>
					<Text className="text-sm text-content-secondary leading-5">
						{confirm.body}
					</Text>
					{errorMessage ? (
						<Text className="mt-2 text-sm text-danger">{errorMessage}</Text>
					) : null}
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.CancelButton onPress={closeConfirm} disabled={isSubmitting}>
						{confirm.cancel}
					</Dialog.CancelButton>
					<Dialog.ConfirmButton onPress={handleConfirm} disabled={isSubmitting}>
						{isSubmitting ? "차단 중" : confirm.confirm}
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>

			<Dialog visible={successVisible} onDismiss={closeSuccess}>
				<Dialog.Title>{success.title}</Dialog.Title>
				<Dialog.Content>
					<Text className="text-sm text-content-secondary leading-5">
						{`${partnerName} ${success.bodySuffix}`}
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Dialog.ConfirmButton onPress={closeSuccess}>
						{success.confirm}
					</Dialog.ConfirmButton>
				</Dialog.Actions>
			</Dialog>
		</>
	);
}
