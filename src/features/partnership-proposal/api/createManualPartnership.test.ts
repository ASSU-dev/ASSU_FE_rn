import MockAdapter from "axios-mock-adapter";
import { apiInstance } from "@/shared/api/instance";
import { createManualPartnership } from "./createManualPartnership";

const mockApi = new MockAdapter(apiInstance);

const request = {
	storeName: "숭실카페",
	selectedPlace: {
		placeId: "p-1",
		name: "숭실카페",
		address: "서울 동작구 상도동 1",
		roadAddress: "서울 동작구 상도로 1",
		latitude: 37.49,
		longitude: 126.95,
	},
	partnershipPeriodStart: "2026-12-01",
	partnershipPeriodEnd: "2026-12-31",
	options: [{ benefit: "음료 1캔 제공" }],
};

const contractFile = {
	uri: "file:///contract.jpg",
	name: "contract.jpg",
	mimeType: "image/jpeg",
};

describe("제휴 수동 등록 API", () => {
	beforeEach(() => {
		mockApi.reset();
	});

	it("request와 contractImage를 multipart로 보내고 결과를 반환한다", async () => {
		mockApi.onPost("/partnership/passivity").reply(200, {
			isSuccess: true,
			code: "OK",
			message: "ok",
			result: {
				storeId: 7,
				status: "SUSPEND",
				contractImageUrl: "https://assu.site/c.jpg",
				partnership: { partnershipId: 31 },
			},
		});

		const result = await createManualPartnership({ request, contractFile });

		expect(result.partnership.partnershipId).toBe(31);
		const sent = mockApi.history.post[0];
		expect(sent?.headers?.["Content-Type"]).toBe("multipart/form-data");
		expect(sent?.data).toBeInstanceOf(FormData);
	});

	it("서버가 실패 응답을 주면 서버 메시지로 에러를 던진다", async () => {
		mockApi.onPost("/partnership/passivity").reply(200, {
			isSuccess: false,
			code: "ERR",
			message: "이미 제휴 중인 가게입니다.",
			result: null,
		});

		await expect(
			createManualPartnership({ request, contractFile }),
		).rejects.toThrow("이미 제휴 중인 가게입니다.");
	});
});
