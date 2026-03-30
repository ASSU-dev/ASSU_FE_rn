import { useState } from "react";
import type { ReportStep, ReportTarget } from "./types";

interface UseReportSuggestionReturn {
	step: ReportStep;
	target: ReportTarget;
	reason: string | null;
	setTarget: (value: string | null) => void;
	setReason: (value: string | null) => void;
	open: () => void;
	close: () => void;
	goToReason: () => void;
	goToDone: () => void;
}

export function useReportSuggestion(): UseReportSuggestionReturn {
	const [step, setStep] = useState<ReportStep>(null);
	const [target, setTargetState] = useState<ReportTarget>(null);
	const [reason, setReason] = useState<string | null>(null);

	function open() {
		setStep("select-target");
		setTargetState(null);
		setReason(null);
	}

	function close() {
		setStep(null);
		setTargetState(null);
		setReason(null);
	}

	function setTarget(value: string | null) {
		setTargetState(value === "user" || value === "post" ? value : null);
	}

	function goToReason() {
		setReason(null);
		setStep("select-reason");
	}

	function goToDone() {
		setStep("done");
	}

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
