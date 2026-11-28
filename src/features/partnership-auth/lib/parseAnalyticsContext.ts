import type { EntryPoint } from "@/shared/lib/analytics/events";
import type { PartnershipAnalyticsContext } from "../model/types";

const ENTRY_POINTS: readonly EntryPoint[] = [
	"store_detail",
	"map_card",
	"scanner_button",
];

// route params로 넘어온 GA 컨텍스트를 검증한다. 알 수 없는 값은 버리고, 인증 방식이 없으면 "direct"로 본다.
export function parseAnalyticsContext(
	entryPoint?: string,
	authMethod?: string,
): PartnershipAnalyticsContext {
	return {
		entryPoint: ENTRY_POINTS.find((point) => point === entryPoint),
		authMethod:
			authMethod === "qr" || authMethod === "number" ? authMethod : "direct",
	};
}
