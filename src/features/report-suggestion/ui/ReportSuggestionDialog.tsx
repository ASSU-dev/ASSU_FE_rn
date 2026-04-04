import type { ReportTarget } from "@/shared/ui/report";
import { ReportModal } from "@/shared/ui/report";
import { REPORT_REASONS } from "../model/constants";
import type { useReportSuggestion } from "../model/useReportSuggestion";

const SUGGESTION_REPORT_CONFIG = {
	targets: [
		{ value: "user", label: "제휴 건의 사용자" },
		{ value: "post", label: "제휴 건의 글" },
	],
	targetWarning:
		"사용자를 신고할 경우 해당 사용자가 작성한 모든 건의글이 삭제됩니다",
	reasons: REPORT_REASONS,
	reasonTitle: (target: ReportTarget) =>
		target === "user"
			? "사용자를 신고하는 사유를 선택해주세요"
			: "글을 신고하는 사유를 선택해주세요",
	doneTitle: (target: ReportTarget) =>
		target === "user"
			? "제휴를 건의한 사용자의 신고가\n완료되었습니다!"
			: "제휴 건의 글의 신고가 완료되었습니다!",
	doneBody: (target: ReportTarget) =>
		target === "user"
			? "신고 직후 해당 사용자가 작성한 모든 제휴건의글은 비공개 처리되며, 해당 사실이 작성자에게 고지되지 않습니다."
			: "신고 직후 해당 글은 비공개 처리되며, 해당 사실이 작성자에게 고지되지 않습니다.",
} as const;

interface ReportSuggestionDialogProps {
	state: ReturnType<typeof useReportSuggestion>;
}

export function ReportSuggestionDialog({ state }: ReportSuggestionDialogProps) {
	return <ReportModal state={state} config={SUGGESTION_REPORT_CONFIG} />;
}
