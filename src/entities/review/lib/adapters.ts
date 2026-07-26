import type { CheckReviewResponseDto } from "../model/api-types";
import type { Review } from "../model/types";

const STUDENT_STATUS = "재학생";

function normalizeAffiliation(affiliation: string): string {
	const normalized = affiliation.trim();
	return normalized.endsWith(STUDENT_STATUS)
		? normalized.slice(0, -STUDENT_STATUS.length).trim()
		: normalized;
}

export function toReview(dto: CheckReviewResponseDto): Review {
	return {
		id: String(dto.reviewId),
		storeName: dto.storeName,
		department: normalizeAffiliation(dto.affiliation),
		studentStatus: STUDENT_STATUS,
		rating: dto.rate,
		content: dto.content,
		images: dto.reviewImageUrls?.map((uri) => ({ uri })),
		createdAt: new Date(dto.createdAt),
	};
}
