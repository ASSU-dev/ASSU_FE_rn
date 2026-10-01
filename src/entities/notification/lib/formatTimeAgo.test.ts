import { formatTimeAgo } from "./formatTimeAgo";

const FIXED_NOW = new Date("2024-01-01T12:00:00.000Z");

describe("formatTimeAgo", () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(FIXED_NOW);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("1분 미만이면 '방금 전'을 반환한다", () => {
		const date = new Date(FIXED_NOW.getTime() - 30 * 1000);
		expect(formatTimeAgo(date)).toBe("방금 전");
	});

	it("1분 이상 1시간 미만이면 'N분 전'을 반환한다", () => {
		const date = new Date(FIXED_NOW.getTime() - 5 * 60 * 1000);
		expect(formatTimeAgo(date)).toBe("5분 전");
	});

	it("1시간 이상 24시간 미만이면 'N시간 전'을 반환한다", () => {
		const date = new Date(FIXED_NOW.getTime() - 3 * 60 * 60 * 1000);
		expect(formatTimeAgo(date)).toBe("3시간 전");
	});

	it("24시간 이상이면 'N일 전'을 반환한다", () => {
		const date = new Date(FIXED_NOW.getTime() - 2 * 24 * 60 * 60 * 1000);
		expect(formatTimeAgo(date)).toBe("2일 전");
	});
});
