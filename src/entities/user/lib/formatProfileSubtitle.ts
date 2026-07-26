import type { StudentProfile, UserBasicInfo } from "../model/types";

export function formatProfileSubtitle(
	basicInfo: StudentProfile | UserBasicInfo | null | undefined,
): string | undefined {
	const subtitle = [
		basicInfo?.university,
		basicInfo?.department,
		basicInfo?.major,
	]
		.filter(Boolean)
		.join(" ");

	return subtitle || undefined;
}
