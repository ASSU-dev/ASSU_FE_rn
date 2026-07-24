import { useCallback, useState } from "react";
import type { ReportStep, ReportTarget } from "./types";

interface ReportSubmitParams {
	entityId: string;
	target: NonNullable<ReportTarget>;
	reason: string;
}

interface UseReportStepsOptions {
	onSubmit?: (params: ReportSubmitParams) => Promise<void> | void;
}

interface UseReportStepsReturn {
	step: ReportStep;
	entityId: string | null;
	target: ReportTarget;
	reason: string | null;
	isSubmitting: boolean;
	errorMessage: string | null;
	setTarget: (value: ReportTarget) => void;
	setReason: (value: string | null) => void;
	open: (id: string) => void;
	close: () => void;
	goToReason: () => void;
	goToDone: () => Promise<void>;
}

export function useReportSteps(
	options: UseReportStepsOptions = {},
): UseReportStepsReturn {
	const [step, setStep] = useState<ReportStep>(null);
	const [entityId, setEntityId] = useState<string | null>(null);
	const [target, setTarget] = useState<ReportTarget>(null);
	const [reason, setReason] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const resetAll = useCallback(() => {
		setTarget(null);
		setReason(null);
		setErrorMessage(null);
		setIsSubmitting(false);
	}, []);

	const open = useCallback(
		(id: string) => {
			setEntityId(id);
			setStep("select-target");
			resetAll();
		},
		[resetAll],
	);

	const close = useCallback(() => {
		setEntityId(null);
		setStep(null);
		resetAll();
	}, [resetAll]);

	const goToReason = useCallback(() => {
		setReason(null);
		setErrorMessage(null);
		setStep("select-reason");
	}, []);

	const goToDone = useCallback(async () => {
		if (!entityId || !target || !reason || isSubmitting) return;

		try {
			setIsSubmitting(true);
			setErrorMessage(null);
			await options.onSubmit?.({ entityId, target, reason });
			setStep("done");
		} catch {
			setErrorMessage("신고 처리 중 문제가 발생했어요. 다시 시도해주세요.");
		} finally {
			setIsSubmitting(false);
		}
	}, [entityId, isSubmitting, options, reason, target]);

	return {
		step,
		entityId,
		target,
		reason,
		isSubmitting,
		errorMessage,
		setTarget,
		setReason,
		open,
		close,
		goToReason,
		goToDone,
	};
}
