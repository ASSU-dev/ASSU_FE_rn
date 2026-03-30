import { useCallback, useState } from "react";
import type { ReportStep, ReportTarget } from "./types";

interface UseReportSuggestionReturn {
	step: ReportStep;
	target: ReportTarget;
	reason: string | null;
	setTarget: (value: ReportTarget) => void;
	setReason: (value: string | null) => void;
	open: () => void;
	close: () => void;
	goToReason: () => void;
	goToDone: () => void;
}

export function useReportSuggestion(): UseReportSuggestionReturn {
	const [step, setStep] = useState<ReportStep>(null);
	const [target, setTargetState] = useState<ReportTarget>(null);
	const [reason, setReasonState] = useState<string | null>(null);

	const resetAll = useCallback(() => {
		setTargetState(null);
		setReasonState(null);
	}, []);

	const open = useCallback(() => {
		setStep("select-target");
		resetAll();
	}, [resetAll]);

	const close = useCallback(() => {
		setStep(null);
		resetAll();
	}, [resetAll]);

	const setTarget = useCallback((value: ReportTarget) => {
		setTargetState(value);
	}, []);

	const setReason = useCallback((value: string | null) => {
		setReasonState(value);
	}, []);

	const goToReason = useCallback(() => {
		setReasonState(null);
		setStep("select-reason");
	}, []);

	const goToDone = useCallback(() => {
		setStep("done");
	}, []);

	return {
		step,
		target,
		reason,
		setTarget,
		setReason,
		open,
		close,
		goToReason,
		goToDone,
	};
}
