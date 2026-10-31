import { toStoreMarker } from "./mapSearchMappers";

function makeNearbyResponse(
	overrides: Record<string, unknown> = {},
): Record<string, unknown> {
	return {
		storeId: 12,
		name: "카페 A",
		address: "서울 동작구 상도로 369",
		latitude: 37.4963,
		longitude: 126.9572,
		hasPartner: true,
		category: "CAFE",
		...overrides,
	};
}

describe("주변 매장 응답의 지도 마커 변환", () => {
	it("id·이름·좌표가 있는 제휴 매장 응답은 지도 마커로 변환된다", () => {
		// Given
		const response = makeNearbyResponse({
			partnerships: [
				{
					adminId: 3,
					adminName: "IT대 학생회",
					benefits: ["아메리카노 10% 할인", { discountRate: 20 }],
				},
			],
		});

		// When
		const marker = toStoreMarker(response);

		// Then
		expect(marker).toMatchObject({
			id: "12",
			name: "카페 A",
			address: "서울 동작구 상도로 369",
			latitude: 37.4963,
			longitude: 126.9572,
			hasPartner: true,
			category: "CAFE",
			partnerships: [
				{
					adminId: "3",
					adminName: "IT대 학생회",
					benefits: ["아메리카노 10% 할인", "20% 할인"],
				},
			],
		});
	});

	it("좌표가 문자열로 와도 숫자 좌표로 변환한다", () => {
		const marker = toStoreMarker(
			makeNearbyResponse({ latitude: "37.4963", longitude: "126.9572" }),
		);

		expect(marker?.latitude).toBe(37.4963);
		expect(marker?.longitude).toBe(126.9572);
	});

	it("서버가 lat/lng 키로 좌표를 보내도 마커 좌표로 사용한다", () => {
		const marker = toStoreMarker({
			storeId: 7,
			storeName: "식당 B",
			lat: 37.5,
			lng: 126.95,
		});

		expect(marker).toMatchObject({
			id: "7",
			name: "식당 B",
			latitude: 37.5,
			longitude: 126.95,
		});
	});

	it.each([
		{ missing: "id", overrides: { storeId: undefined } },
		{ missing: "이름", overrides: { name: undefined } },
		{ missing: "위도", overrides: { latitude: undefined } },
		{ missing: "경도", overrides: { longitude: undefined } },
		{ missing: "위도(숫자 아님)", overrides: { latitude: "unknown" } },
	])("$missing 정보가 없으면 지도 마커에서 제외된다", ({ overrides }) => {
		expect(toStoreMarker(makeNearbyResponse(overrides))).toBeNull();
	});

	it.each([
		{ value: null },
		{ value: "카페 A" },
		{ value: [makeNearbyResponse()] },
	])("매장 객체가 아닌 응답($value)은 지도 마커에서 제외된다", ({ value }) => {
		expect(toStoreMarker(value)).toBeNull();
	});

	it("정의되지 않은 카테고리 값은 카테고리 없이 처리한다", () => {
		const marker = toStoreMarker(makeNearbyResponse({ category: "UNKNOWN" }));

		expect(marker).not.toBeNull();
		expect(marker?.category).toBeUndefined();
	});

	it("제휴 여부 필드가 없으면 비제휴 매장으로 처리한다", () => {
		const marker = toStoreMarker(makeNearbyResponse({ hasPartner: undefined }));

		expect(marker?.hasPartner).toBe(false);
	});

	it("학생회 이름이 없는 제휴 정보는 제외하고, 남는 정보가 없으면 제휴 목록을 비운다", () => {
		const marker = toStoreMarker(
			makeNearbyResponse({ partnerships: [{ benefits: ["음료 제공"] }] }),
		);

		expect(marker?.partnerships).toBeUndefined();
	});
});
