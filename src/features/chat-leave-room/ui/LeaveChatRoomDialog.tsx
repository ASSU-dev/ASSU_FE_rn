import { Text } from "react-native";

import { Dialog } from "@/shared/ui/dialog";

import { LEAVE_CHAT_ROOM_DIALOG } from "../model/constants";
import type { useLeaveChatRoom } from "../model/useLeaveChatRoom";

interface LeaveChatRoomDialogProps {
	state: ReturnType<typeof useLeaveChatRoom>;
}

export function LeaveChatRoomDialog({ state }: LeaveChatRoomDialogProps) {
	const { visible, close, handleConfirm } = state;
	const { title, body, cancel, confirm } = LEAVE_CHAT_ROOM_DIALOG;

	return (
		<Dialog visible={visible} onDismiss={close}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Content>
				<Text className="text-sm text-content-secondary leading-5">{body}</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Dialog.CancelButton onPress={close}>{cancel}</Dialog.CancelButton>
				<Dialog.ConfirmButton onPress={handleConfirm}>
					{confirm}
				</Dialog.ConfirmButton>
			</Dialog.Actions>
		</Dialog>
	);
}
