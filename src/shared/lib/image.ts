import { ENV } from "@/shared/config/env";

export function toAbsoluteImageUrl(
	url: string | null | undefined,
): string | undefined {
	if (!url) return undefined;
	if (url.startsWith("http")) return url;
	return `${ENV.API_BASE_URL}/${url}`;
}
