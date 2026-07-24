import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import type {
	CreateReportPayload,
	CreateReportRequestDto,
	CreateReportResponseDto,
	ReportReason,
	ReportTargetType,
	ReportType,
} from "../model/types";

const REPORT_TYPE_MAP: Record<
	ReportTargetType,
	Record<ReportReason, ReportType>
> = {
	REVIEW: {
		inappropriate: "REVIEW_INAPPROPRIATE_CONTENT",
		false: "REVIEW_FALSE_INFORMATION",
		ad: "REVIEW_SPAM",
	},
	SUGGESTION: {
		inappropriate: "SUGGESTION_INAPPROPRIATE_CONTENT",
		false: "SUGGESTION_FALSE_INFORMATION",
		ad: "SUGGESTION_SPAM",
	},
};

export async function createReport({
	reportTarget,
	targetType,
	targetId,
	reason,
}: CreateReportPayload): Promise<CreateReportResponseDto> {
	const body: CreateReportRequestDto = {
		targetType,
		targetId,
		reportType: REPORT_TYPE_MAP[targetType][reason],
	};
	const endpoint = reportTarget === "user" ? "/reports/students" : "/reports";
	if (__DEV__) console.log("[createReport] 요청:", endpoint, body);
	const res = await apiInstance.post<BaseResponse<CreateReportResponseDto>>(
		endpoint,
		body,
	);
	if (__DEV__) console.log("[createReport] 응답:", res.data.result);
	return res.data.result;
}
