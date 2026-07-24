import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import type {
	AnswerInquiryRequest,
	CreateInquiryRequest,
	Inquiry,
	InquiryDetail,
	InquiryListParams,
	InquiryPageResponseDto,
	InquiryResponseDto,
} from "../model/types";

export const inquiryQueryKeys = {
	all: ["inquiries"] as const,
	list: (params: InquiryListParams = {}) =>
		[...inquiryQueryKeys.all, "list", params] as const,
	detail: (inquiryId: string) =>
		[...inquiryQueryKeys.all, "detail", inquiryId] as const,
};

const formatInquiryDate = (createdAt: string) => {
	const [date, time = ""] = createdAt.split("T");
	return `${date} ${time.slice(0, 5)}`.trim();
};

const toInquiry = (dto: InquiryResponseDto): Inquiry => ({
	id: String(dto.id),
	title: dto.title,
	createdAt: formatInquiryDate(dto.createdAt),
	status: dto.status === "ANSWERED" ? "completed" : "waiting",
});

const toInquiryDetail = (dto: InquiryResponseDto): InquiryDetail => ({
	...toInquiry(dto),
	content: dto.content,
	answer: dto.answer ?? undefined,
});

export async function getInquiries(
	params: InquiryListParams = {},
): Promise<Inquiry[]> {
	const { data } = await apiInstance.get<BaseResponse<InquiryPageResponseDto>>(
		"/inquiries",
		{
			params: {
				status: params.status ?? "ALL",
				page: params.page ?? 1,
				size: params.size ?? 20,
			},
		},
	);

	return data.result.items.map(toInquiry);
}

export async function createInquiry(
	request: CreateInquiryRequest,
): Promise<number> {
	const { data } = await apiInstance.post<BaseResponse<number>>(
		"/inquiries",
		request,
	);

	return data.result;
}

export async function answerInquiry(
	inquiryId: string,
	request: AnswerInquiryRequest,
): Promise<string> {
	const { data } = await apiInstance.patch<BaseResponse<string>>(
		`/inquiries/${inquiryId}/answer`,
		request,
	);

	return data.result;
}

export async function getInquiryDetail(
	inquiryId: string,
): Promise<InquiryDetail> {
	const { data } = await apiInstance.get<BaseResponse<InquiryResponseDto>>(
		`/inquiries/${inquiryId}`,
	);

	return toInquiryDetail(data.result);
}
