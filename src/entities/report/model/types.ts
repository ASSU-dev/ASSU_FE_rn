export type ReportTargetType = "REVIEW" | "SUGGESTION";
export type ReportReason = "inappropriate" | "false" | "ad";
export type ReportSubject = "user" | "post";

export type CreateReportPayload = {
	reportTarget: ReportSubject;
	targetType: ReportTargetType;
	targetId: number;
	reason: ReportReason;
};

export type ReportType =
	| "REVIEW_INAPPROPRIATE_CONTENT"
	| "REVIEW_FALSE_INFORMATION"
	| "REVIEW_SPAM"
	| "SUGGESTION_INAPPROPRIATE_CONTENT"
	| "SUGGESTION_FALSE_INFORMATION"
	| "SUGGESTION_SPAM";

export interface CreateReportRequestDto {
	targetType: ReportTargetType;
	targetId: number;
	reportType: ReportType;
}

export interface CreateReportResponseDto {
	reportId: number;
}
