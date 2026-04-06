import { ReportModal } from "@/shared/ui/report";
import { REVIEW_REPORT_CONFIG } from "../model/constants";
import type { useReportReview } from "../model/useReportReview";

interface ReportReviewDialogProps {
	state: ReturnType<typeof useReportReview>;
}

export function ReportReviewDialog({ state }: ReportReviewDialogProps) {
	return <ReportModal state={state} config={REVIEW_REPORT_CONFIG} />;
}
