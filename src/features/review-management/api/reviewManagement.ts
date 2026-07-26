import type {
	CreateReviewVariables,
	DeleteReviewResponseDto,
	WriteReviewResponseDto,
} from "@/entities/review";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";

function unwrapReviewResult<T>(
	response: BaseResponse<T>,
	fallbackMessage: string,
): T {
	if (!response.isSuccess || response.result == null) {
		throw new Error(response.message || fallbackMessage);
	}

	return response.result;
}

export async function createReview({
	request,
	reviewImages = [],
}: CreateReviewVariables): Promise<WriteReviewResponseDto> {
	const formData = new FormData();
	formData.append("request", JSON.stringify(request));
	for (const image of reviewImages) {
		formData.append("reviewImages", image as unknown as Blob);
	}

	const res = await apiInstance.post<BaseResponse<WriteReviewResponseDto>>(
		"/reviews",
		formData,
		{ headers: { "Content-Type": "multipart/form-data" } },
	);

	return unwrapReviewResult(res.data, "리뷰 작성에 실패했습니다.");
}

export async function deleteReview(
	reviewId: number,
): Promise<DeleteReviewResponseDto> {
	const res = await apiInstance.delete<BaseResponse<DeleteReviewResponseDto>>(
		`/reviews/${reviewId}`,
	);

	return unwrapReviewResult(res.data, "리뷰 삭제에 실패했습니다.");
}
