import type { SelectItem } from "@/shared/ui/select";
import type { GetSuggestionAdminsDto } from "../model/api-types";

type TargetCandidate = {
	label: string | null;
	value: number | null;
};

function isValidTarget(
	candidate: TargetCandidate,
): candidate is { label: string; value: number } {
	return candidate.label != null && candidate.value != null;
}

/** 서버가 null로 내려주는 학생회(단과대/학과 미소속)는 선택지에서 제외한다. */
export function toSuggestionTargetItems(
	dto: GetSuggestionAdminsDto,
): SelectItem[] {
	const candidates: TargetCandidate[] = [
		{ label: dto.adminName, value: dto.adminId },
		{ label: dto.departName, value: dto.departId },
		{ label: dto.majorName, value: dto.majorId },
	];

	return candidates.filter(isValidTarget).map((candidate) => ({
		label: candidate.label,
		value: String(candidate.value),
	}));
}
