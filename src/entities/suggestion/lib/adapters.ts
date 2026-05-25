import type { SelectItem } from "@/shared/ui/select";
import type { GetSuggestionAdminsDto } from "../model/api-types";

export function toSuggestionTargetItems(
	dto: GetSuggestionAdminsDto,
): SelectItem[] {
	return [
		{ label: dto.adminName, value: String(dto.adminId) },
		{ label: dto.departName, value: String(dto.departId) },
		{ label: dto.majorName, value: String(dto.majorId) },
	];
}
