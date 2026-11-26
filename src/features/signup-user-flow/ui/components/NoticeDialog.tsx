import { Text } from "react-native";
import { Dialog } from "@/shared/ui/dialog";

interface NoticeDialogProps {
	visible: boolean;
	title: string;
	message: string;
	onClose: () => void;
}

/** 제목 + 메시지 + "확인" 버튼 하나로 구성된 안내 다이얼로그 (시스템 Alert 대체) */
export function NoticeDialog({
	visible,
	title,
	message,
	onClose,
}: NoticeDialogProps) {
	return (
		<Dialog visible={visible} onDismiss={onClose}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Content>
				<Text className="text-sm text-content-secondary">{message}</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Dialog.ConfirmButton onPress={onClose}>확인</Dialog.ConfirmButton>
			</Dialog.Actions>
		</Dialog>
	);
}
