import { logEvent } from "./analytics";
import { trackEvent } from "./trackEvent";

jest.mock("./analytics", () => ({
	logEvent: jest.fn(),
}));

describe("trackEvent", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("이벤트명과 파라미터를 logEvent로 그대로 전달한다", () => {
		// When
		trackEvent("partnership_started", {
			entry_point: "store_detail",
			store_id: 7,
		});

		// Then
		expect(logEvent).toHaveBeenCalledWith("partnership_started", {
			entry_point: "store_detail",
			store_id: 7,
		});
	});

	it("값이 없는 파라미터는 키째 제외하고 전달한다", () => {
		// When
		trackEvent("partnership_started", {
			entry_point: "scanner_button",
			store_id: undefined,
		});

		// Then
		expect(logEvent).toHaveBeenCalledWith("partnership_started", {
			entry_point: "scanner_button",
		});
	});

	it("0 같은 falsy 값은 제외하지 않는다", () => {
		// When
		trackEvent("benefit_selected", {
			store_id: 7,
			content_id: 1,
			benefit_type: "individual",
			preselected: 0,
			auth_method: "direct",
		});

		// Then
		expect(logEvent).toHaveBeenCalledWith(
			"benefit_selected",
			expect.objectContaining({ preselected: 0 }),
		);
	});
});
