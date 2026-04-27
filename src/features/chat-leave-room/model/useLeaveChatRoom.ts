import { useState } from "react";

interface UseLeaveChatRoomOptions {
	onLeave: () => void;
}

export function useLeaveChatRoom({ onLeave }: UseLeaveChatRoomOptions) {
	const [visible, setVisible] = useState(false);

	function open() {
		setVisible(true);
	}

	function close() {
		setVisible(false);
	}

	function handleConfirm() {
		setVisible(false);
		onLeave();
	}

	return { visible, open, close, handleConfirm };
}
