import { useState } from "react";

interface UseBlockDialogOptions {
	onBlock: () => void;
}

export function useBlockDialog({ onBlock }: UseBlockDialogOptions) {
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [successVisible, setSuccessVisible] = useState(false);

	function openConfirm() {
		setConfirmVisible(true);
	}

	function closeConfirm() {
		setConfirmVisible(false);
	}

	function handleConfirm() {
		setConfirmVisible(false);
		onBlock();
		setSuccessVisible(true);
	}

	function closeSuccess() {
		setSuccessVisible(false);
	}

	return {
		confirmVisible,
		successVisible,
		openConfirm,
		closeConfirm,
		handleConfirm,
		closeSuccess,
	};
}
