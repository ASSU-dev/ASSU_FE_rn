import { DEFAULT_BENEFIT_ITEM, type ProposalFormData } from "../model";
import { toManualPartnershipRequest } from "./toManualPartnershipRequest";
import { toSelectedPlace } from "./toSelectedPlace";

const place = {
	placeId: "p-1",
	name: "숭실카페",
	address: "서울 동작구 상도동 1",
	roadAddress: "서울 동작구 상도로 1",
	latitude: 37.49,
	longitude: 126.95,
};

function makeForm(overrides: Partial<ProposalFormData> = {}): ProposalFormData {
	return {
		selectedPlace: place,
		storeDetailAddress: "",
		benefits: [{ ...DEFAULT_BENEFIT_ITEM, id: "1", benefit: "음료 1캔 제공" }],
		startDate: "2026-12-01",
		endDate: "2026-12-31",
		contractFile: { uri: "file:///c.jpg", name: "c.jpg" },
		...overrides,
	};
}

describe("수동 등록 요청 바디 변환", () => {
	it("storeName은 선택한 장소 이름으로 채운다", () => {
		const request = toManualPartnershipRequest(makeForm());

		expect(request.storeName).toBe("숭실카페");
		expect(request.selectedPlace).toEqual(place);
		expect(request.partnershipPeriodStart).toBe("2026-12-01");
		expect(request.partnershipPeriodEnd).toBe("2026-12-31");
	});

	it("비어 있는 선택 입력은 요청에서 제외한다", () => {
		const request = toManualPartnershipRequest(makeForm());

		expect(request.options).toEqual([{ benefit: "음료 1캔 제공" }]);
		expect(request).not.toHaveProperty("storeDetailAddress");
	});

	it("입력한 값은 공백을 제거하고 최소 인원은 숫자로 보낸다", () => {
		const request = toManualPartnershipRequest(
			makeForm({
				storeDetailAddress: " 2층 ",
				benefits: [
					{
						id: "1",
						benefitCondition: " 30,000원 이상 주문 시 ",
						benefit: " 음료 1캔 제공 ",
						caution: " 학생증 지참 ",
						minPeople: "4",
					},
				],
			}),
		);

		expect(request.storeDetailAddress).toBe("2층");
		expect(request.options).toEqual([
			{
				benefitCondition: "30,000원 이상 주문 시",
				benefit: "음료 1캔 제공",
				caution: "학생증 지참",
				minPeople: 4,
			},
		]);
	});

	it("혜택은 입력한 순서를 유지한다", () => {
		const request = toManualPartnershipRequest(
			makeForm({
				benefits: [
					{ ...DEFAULT_BENEFIT_ITEM, id: "1", benefit: "첫째" },
					{ ...DEFAULT_BENEFIT_ITEM, id: "2", benefit: "둘째" },
					{ ...DEFAULT_BENEFIT_ITEM, id: "3", benefit: "셋째" },
				],
			}),
		);

		expect(request.options.map((option) => option.benefit)).toEqual([
			"첫째",
			"둘째",
			"셋째",
		]);
	});

	it("장소나 기간이 없으면 에러를 던진다", () => {
		expect(() =>
			toManualPartnershipRequest(makeForm({ selectedPlace: null })),
		).toThrow("가게를 선택해주세요.");
		expect(() =>
			toManualPartnershipRequest(makeForm({ endDate: null })),
		).toThrow("제휴 기간을 선택해주세요.");
	});
});

describe("장소 검색 결과를 selectedPlace로 변환", () => {
	it("검색 결과의 장소 정보를 그대로 옮긴다", () => {
		expect(
			toSelectedPlace({
				id: "p-1",
				label: place.roadAddress,
				name: place.name,
				address: place.address,
				roadAddress: place.roadAddress,
				latitude: place.latitude,
				longitude: place.longitude,
			}),
		).toEqual(place);
	});

	it("좌표가 없는 결과는 선택할 수 없다", () => {
		expect(
			toSelectedPlace({ id: "p-1", label: "주소", name: "숭실카페" }),
		).toBeNull();
	});

	it("이름이 없으면 label로 대신한다", () => {
		expect(
			toSelectedPlace({
				id: "p-2",
				label: "서울 동작구 상도로 1",
				latitude: 1,
				longitude: 2,
			}),
		).toMatchObject({
			placeId: "p-2",
			name: "서울 동작구 상도로 1",
			address: "서울 동작구 상도로 1",
			roadAddress: "서울 동작구 상도로 1",
		});
	});
});
