import { useCallback, useState } from "react";
import type { ReportStep, ReportTarget } from "./types";

interface UseReportStepsReturn {
	step: ReportStep;
	entityId: string | null;
	target: ReportTarget;
	reason: string | null;
	setTarget: (value: ReportTarget) => void;
	setReason: (value: string | null) => void;
	open: (id: string) => void;
	close: () => void;
	goToReason: () => void;
	goToDone: () => void;
}

export function useReportSteps(): UseReportStepsReturn {
	const [step, setStep] = useState<ReportStep>(null);
	const [entityId, setEntityId] = useState<string | null>(null);
	const [target, setTarget] = useState<ReportTarget>(null);
	const [reason, setReason] = useState<string | null>(null);

	const resetAll = useCallback(() => {
		setTarget(null);
		setReason(null);
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
		setStep("select-reason");
	}, []);

	const goToDone = useCallback(() => {
		setStep("done");
	}, []);

	return {
		step,
		entityId,
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
