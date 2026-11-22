import { Text } from "react-native";

import { Dialog } from "@/shared/ui/dialog";

interface StampAlreadyAppliedDialogProps {
	visible: boolean;
	onConfirm: () => void;
}

export function StampAlreadyAppliedDialog({
	visible,
	onConfirm,
}: StampAlreadyAppliedDialogProps) {
	return (
		<Dialog visible={visible} onDismiss={onConfirm}>
			<Dialog.Title>오늘 이미 스탬프를 적립했어요</Dialog.Title>
			<Dialog.Content>
				<Text className="text-sm text-content-secondary">
					스탬프는 하루에 한 번만 적립돼요.
				</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Dialog.ConfirmButton onPress={onConfirm}>확인</Dialog.ConfirmButton>
			</Dialog.Actions>
		</Dialog>
	);
}
