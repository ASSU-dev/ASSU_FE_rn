import type { ReportTarget } from "@/shared/ui/report";

export const REVIEW_REPORT_REASONS: Record<
	NonNullable<ReportTarget>,
	readonly { value: string; label: string }[]
> = {
	user: [
		{
			value: "inappropriate",
			label: "부적절한 내용 및 욕설이 포함한 글을 작성했어요",
		},
		{ value: "false", label: "허위사실 / 거짓이 포함된 글을 작성했어요" },
		{ value: "ad", label: "홍보/광고를 위한 건의글을 작성했어요" },
	],
	post: [
		{
			value: "inappropriate",
			label: "부적절한 내용 및 욕설이 포함된 리뷰에요",
		},
		{ value: "false", label: "허위사실 / 거짓이 포함된 리뷰에요" },
		{ value: "ad", label: "홍보/광고를 위한 리뷰에요" },
	],
};
