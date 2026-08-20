import { useState } from "react";

interface UseBlockDialogOptions {
	onBlock: () => Promise<void>;
}

export function useBlockDialog({ onBlock }: UseBlockDialogOptions) {
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [successVisible, setSuccessVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function openConfirm() {
		setErrorMessage(null);
		setConfirmVisible(true);
	}

	function closeConfirm() {
		if (isSubmitting) return;
		setErrorMessage(null);
		setConfirmVisible(false);
	}

	async function handleConfirm() {
		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			setErrorMessage(null);
			await onBlock();
			setConfirmVisible(false);
			setSuccessVisible(true);
		} catch {
			setErrorMessage("차단 처리 중 문제가 발생했어요. 다시 시도해주세요.");
		} finally {
			setIsSubmitting(false);
		}
	}

	function closeSuccess() {
		setSuccessVisible(false);
	}

	return {
		confirmVisible,
		successVisible,
		isSubmitting,
		errorMessage,
		openConfirm,
		closeConfirm,
		handleConfirm,
		closeSuccess,
	};
}
