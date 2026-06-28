import type { CheckReviewResponseDto } from "../model/api-types";
import type { Review } from "../model/types";

export function toReview(dto: CheckReviewResponseDto): Review {
	return {
		id: String(dto.reviewId),
		department: dto.storeName || dto.affiliation,
		studentStatus: dto.affiliation,
		rating: dto.rate,
		content: dto.content,
		images: dto.reviewImageUrls?.map((uri) => ({ uri })),
		createdAt: new Date(dto.createdAt),
	};
}
