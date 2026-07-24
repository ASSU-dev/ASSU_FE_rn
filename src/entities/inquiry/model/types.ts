export interface Inquiry {
	id: string;
	title: string;
	createdAt: string; // Format: YYYY-MM-DD HH:MM
	status: "waiting" | "completed";
}

export interface InquiryDetail extends Inquiry {
	content: string;
	answer?: string;
}

export type InquiryApiStatus = "WAITING" | "ANSWERED";

export interface InquiryResponseDto {
	id: number;
	title: string;
	content: string;
	email: string;
	status: InquiryApiStatus;
	answer?: string | null;
	createdAt: string;
}

export interface InquiryPageResponseDto {
	items: InquiryResponseDto[];
	page: number;
	size: number;
	totalPages: number;
	totalElements: number;
}

export interface CreateInquiryRequest {
	title: string;
	content: string;
	email: string;
}

export interface AnswerInquiryRequest {
	answer: string;
}

export interface InquiryListParams {
	status?: InquiryApiStatus | "ALL";
	page?: number;
	size?: number;
}
