import { buildGroupUsageParams } from "./buildGroupUsageParams";

describe("buildGroupUsageParams", () => {
	it("필요 인원이 모두 앱으로 인증하면 검증되지 않은 인원은 0이다", () => {
		expect(buildGroupUsageParams(4, 4)).toEqual({
			group_size: 4,
			group_app_verified: 4,
			group_unverified: 0,
		});
	});

	it("일부만 앱으로 인증하면 나머지를 검증되지 않은 인원으로 계산한다", () => {
		expect(buildGroupUsageParams(4, 2)).toEqual({
			group_size: 4,
			group_app_verified: 2,
			group_unverified: 2,
		});
	});

	it("인증 인원이 필요 인원을 넘어도 필요 인원까지만 센다", () => {
		expect(buildGroupUsageParams(4, 6)).toEqual({
			group_size: 4,
			group_app_verified: 4,
			group_unverified: 0,
		});
	});

	it("인증 인원이 음수여도 0으로 보정한다", () => {
		expect(buildGroupUsageParams(4, -1)).toEqual({
			group_size: 4,
			group_app_verified: 0,
			group_unverified: 4,
		});
	});
});
