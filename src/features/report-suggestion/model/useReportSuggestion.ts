import { useCallback } from "react";
import { createReport, type ReportReason } from "@/entities/report";
import { useReportSteps } from "@/shared/ui/report";

export function useReportSuggestion() {
	const handleSubmit = useCallback(
		async ({
			entityId,
			target,
			reason,
		}: {
			entityId: string;
			target: "user" | "post";
			reason: string;
		}) => {
			await createReport({
				reportTarget: target,
				targetType: "SUGGESTION",
				targetId: Number(entityId),
				reason: reason as ReportReason,
			});
		},
		[],
	);

	return useReportSteps({ onSubmit: handleSubmit });
}
