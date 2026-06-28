import type { GetSuggestionResponseDto } from "../model/api-types";
import type { Suggestion } from "../model/types";

const MAJOR_LABELS: Record<string, string> = {
	GLOBAL_MEDIA: "글로벌미디어학부",
	COMPUTER_SCIENCE: "컴퓨터학부",
	BUSINESS_ADMINISTRATION: "경영학부",
	SOCIAL_WELFARE: "사회복지학부",
	MEDIA_COMMUNICATION: "언론홍보학과",
	SOFTWARE: "소프트웨어학부",
	AI_CONVERGENCE: "AI융합학부",
	ECONOMICS: "경제학과",
	LAW: "법학과",
};

const STATUS_LABELS: Record<string, string> = {
	ENROLLED: "재학생",
	LEAVE: "휴학생",
	GRADUATED: "졸업생",
};

function toReadableEnum(value: string): string {
	return value
		.split("_")
		.map((word) => word.slice(0, 1) + word.slice(1).toLowerCase())
		.join(" ");
}

export function toSuggestion(dto: GetSuggestionResponseDto): Suggestion {
	return {
		id: String(dto.suggestionId),
		storeName: dto.storeName,
		department:
			MAJOR_LABELS[dto.studentMajor] ?? toReadableEnum(dto.studentMajor),
		studentStatus: STATUS_LABELS[dto.enrollmentStatus] ?? dto.enrollmentStatus,
		content: dto.content,
		createdAt: new Date(dto.createdAt),
	};
}
