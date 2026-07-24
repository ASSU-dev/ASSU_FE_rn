import type { UserBasicInfo } from "../model/types";

export function formatProfileSubtitle(
	basicInfo: UserBasicInfo | null | undefined,
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
