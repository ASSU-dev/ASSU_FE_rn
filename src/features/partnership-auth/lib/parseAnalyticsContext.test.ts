import { parseAnalyticsContext } from "./parseAnalyticsContext";

describe("parseAnalyticsContext", () => {
	it("알려진 진입 경로와 인증 방식은 그대로 돌려준다", () => {
		expect(parseAnalyticsContext("scanner_button", "qr")).toEqual({
			entryPoint: "scanner_button",
			authMethod: "qr",
		});
		expect(parseAnalyticsContext("store_detail", "number")).toEqual({
			entryPoint: "store_detail",
			authMethod: "number",
		});
	});

	it("인증 방식이 없으면 direct로 본다", () => {
		expect(parseAnalyticsContext("map_card")).toEqual({
			entryPoint: "map_card",
			authMethod: "direct",
		});
	});

	it("알 수 없는 값은 버린다", () => {
		expect(parseAnalyticsContext("unknown", "group")).toEqual({
			entryPoint: undefined,
			authMethod: "direct",
		});
	});
});
