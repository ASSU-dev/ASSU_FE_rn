import { toViewport } from "./toViewport";

describe("지도 중심 좌표의 주변 조회 범위 변환", () => {
	it("기본값으로 중심에서 ±0.01° 사각형의 북서·북동·남동·남서 꼭짓점을 만든다", () => {
		// When
		const viewport = toViewport({ lat: 37.5, lng: 127 });

		// Then
		expect(viewport.lng1).toBeCloseTo(126.99);
		expect(viewport.lat1).toBeCloseTo(37.51);
		expect(viewport.lng2).toBeCloseTo(127.01);
		expect(viewport.lat2).toBeCloseTo(37.51);
		expect(viewport.lng3).toBeCloseTo(127.01);
		expect(viewport.lat3).toBeCloseTo(37.49);
		expect(viewport.lng4).toBeCloseTo(126.99);
		expect(viewport.lat4).toBeCloseTo(37.49);
	});

	it("범위 크기를 지정하면 그 크기만큼 사각형을 넓힌다", () => {
		const viewport = toViewport({ lat: 37.5, lng: 127 }, 0.05);

		expect(viewport.lng1).toBeCloseTo(126.95);
		expect(viewport.lat1).toBeCloseTo(37.55);
		expect(viewport.lng3).toBeCloseTo(127.05);
		expect(viewport.lat3).toBeCloseTo(37.45);
	});
});
