import type {
	BaseResponse,
	WriteSuggestionRequestDto,
	WriteSuggestionResponseDto,
} from "@/entities/suggestion";
import { apiInstance } from "@/shared/api/instance";

export type PostSuggestionPayload = {
	target: string;
	storeName: string;
	desiredBenefit: string;
};

export async function postSuggestion(
	payload: PostSuggestionPayload,
): Promise<WriteSuggestionResponseDto> {
	const body: WriteSuggestionRequestDto = {
		adminId: Number(payload.target),
		storeName: payload.storeName,
		benefit: payload.desiredBenefit,
	};
	if (__DEV__) console.log("[postSuggestion] 요청:", body);
	const res = await apiInstance.post<BaseResponse<WriteSuggestionResponseDto>>(
		"/suggestion",
		body,
	);
	if (__DEV__) console.log("[postSuggestion] 응답:", res.data.result);
	return res.data.result;
}
