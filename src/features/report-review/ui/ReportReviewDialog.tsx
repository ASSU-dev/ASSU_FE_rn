import type { ReportTarget } from "@/shared/ui/report";
import { ReportModal } from "@/shared/ui/report";
import { REVIEW_REPORT_REASONS } from "../model/constants";
import type { useReportReview } from "../model/useReportReview";

const REVIEW_REPORT_CONFIG = {
	targets: [
		{ value: "user", label: "고객 리뷰 작성자" },
		{ value: "post", label: "고객 리뷰 글" },
	],
	targetWarning:
		"작성자를 신고할 경우 해당 사용자가 작성한 모든 리뷰가 비공개 처리됩니다",
	reasons: (target: ReportTarget) => REVIEW_REPORT_REASONS[target ?? "post"],
	reasonTitle: (target: ReportTarget) =>
		target === "user"
			? "작성자를 신고하는 사유를 선택해주세요"
			: "고객 리뷰를 신고하는 사유를 선택해주세요",
	doneTitle: (target: ReportTarget) =>
		target === "user"
			? "리뷰 작성자에 대한 신고가 완료되었습니다!"
			: "리뷰의 신고가 완료되었습니다!",
	doneBody: (target: ReportTarget) =>
		target === "user"
			? "신고 직후 해당 사용자가 작성한 모든 리뷰는 비공개 처리되며, 해당 사실이 작성자에게 고지되지 않습니다."
			: "신고 직후 해당 리뷰는 비공개 처리되며, 부적절한 사유로 신고한 경우 불이익이 있을수도 있습니다",
} as const;

interface ReportReviewDialogProps {
	state: ReturnType<typeof useReportReview>;
}

export function ReportReviewDialog({ state }: ReportReviewDialogProps) {
	return <ReportModal state={state} config={REVIEW_REPORT_CONFIG} />;
}
