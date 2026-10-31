import MockAdapter from "axios-mock-adapter";
import { apiInstance } from "@/shared/api/instance";
import {
	certifyPersonalPartnership,
	createGroupCertificationSession,
	getStorePartnerships,
	parsePartnershipStoreId,
} from "./partnershipAuth";

const mockApi = new MockAdapter(apiInstance);

describe("매장 QR 매장 번호 인식", () => {
	it.each([
		{ label: "숫자만 있는 QR", value: " 12 ", expected: 12 },
		{ label: "JSON QR", value: '{"storeId":34}', expected: 34 },
		{
			label: "URL 쿼리 QR",
			value: "https://assu.app/partnership?storeId=56",
			expected: 56,
		},
		{
			label: "제휴 경로 QR",
			value: "assu-app://partnership/78",
			expected: 78,
		},
		{ label: "키=값 문자열 QR", value: "storeId=90", expected: 90 },
	])("$label에서 매장 번호를 읽는다", ({ value, expected }) => {
		expect(parsePartnershipStoreId(value)).toBe(expected);
	});

	it.each([
		{ label: "빈 문자열", value: "" },
		{ label: "매장 번호가 없는 문자열", value: "hello-assu" },
		{ label: "0번 매장", value: "0" },
		{ label: "음수 매장 번호", value: '{"storeId":-3}' },
		{ label: "안전 정수 범위를 넘는 번호", value: "9007199254740993" },
		{ label: "매장 번호가 비어 있는 URL", value: "https://assu.app/?storeId=" },
	])("$label이면 제휴 QR로 인정하지 않는다", ({ value }) => {
		expect(parsePartnershipStoreId(value)).toBeNull();
	});
});

describe("매장 제휴 혜택 조회 응답 변환", () => {
	beforeEach(() => {
		mockApi.reset();
	});

	it.each([
		{ people: null, expected: "INDIVIDUAL" },
		{ people: 1, expected: "INDIVIDUAL" },
		{ people: 2, expected: "GROUP" },
		{ people: 4, expected: "GROUP" },
	])("인원 조건이 $people명이면 $expected 혜택으로 구분한다", async ({
		people,
		expected,
	}) => {
		// Given
		mockApi.onGet("/store/7/papers").reply(200, {
			isSuccess: true,
			result: {
				storeId: 7,
				storeName: "숭실 분식",
				partnershipContents: [
					{
						contentId: 1,
						adminId: 10,
						adminName: "IT대학 학생회",
						paperContent: "제휴 혜택",
						people,
					},
				],
			},
		});

		// When
		const store = await getStorePartnerships(7);

		// Then
		expect(store.benefits[0].type).toBe(expected);
	});

	it("혜택 번호·담당 단체·내용이 빠진 항목은 인증 대상에서 제외한다", async () => {
		// Given
		mockApi.onGet("/store/7/papers").reply(200, {
			result: {
				storeId: 7,
				storeName: "숭실 분식",
				partnershipContents: [
					{ adminId: 10, adminName: "학생회", paperContent: "번호 없음" },
					{ contentId: 2, adminName: "학생회", paperContent: "단체 없음" },
					{ contentId: 3, adminId: 10, paperContent: "담당자 없음" },
					{ contentId: 4, adminId: 10, adminName: "학생회" },
					{
						contentId: 5,
						adminId: 10,
						adminName: "학생회",
						paperContent: "정상 혜택",
					},
				],
			},
		});

		// When
		const store = await getStorePartnerships(7);

		// Then
		expect(store.benefits.map((benefit) => benefit.id)).toEqual([5]);
	});

	it("매장 정보가 없으면 서버 메시지로 조회 실패를 알린다", async () => {
		mockApi.onGet("/store/7/papers").reply(200, {
			isSuccess: false,
			message: "존재하지 않는 매장입니다.",
			result: null,
		});

		await expect(getStorePartnerships(7)).rejects.toThrow(
			"존재하지 않는 매장입니다.",
		);
	});
});

describe("개인·단체 제휴 인증 요청", () => {
	beforeEach(() => {
		mockApi.reset();
	});

	it("개인 인증은 매장·단체 번호와 고정 테이블 번호로 요청한다", async () => {
		// Given
		mockApi.onPost("/certification/personal").reply(200, { isSuccess: true });

		// When
		await certifyPersonalPartnership({ storeId: 7, adminId: 10 });

		// Then
		expect(JSON.parse(mockApi.history.post[0].data)).toEqual({
			storeId: 7,
			adminId: 10,
			tableNumber: 99,
		});
	});

	it("개인 인증이 거절되면 서버 메시지로 실패를 알린다", async () => {
		mockApi.onPost("/certification/personal").reply(200, {
			isSuccess: false,
			message: "제휴 대상자가 아닙니다.",
		});

		await expect(
			certifyPersonalPartnership({ storeId: 7, adminId: 10 }),
		).rejects.toThrow("제휴 대상자가 아닙니다.");
	});

	it("단체 인증 세션을 만들면 세션 번호를 돌려준다", async () => {
		mockApi
			.onPost("/certification/session")
			.reply(200, { isSuccess: true, result: { sessionId: 321 } });

		await expect(
			createGroupCertificationSession({ people: 4, storeId: 7, adminId: 10 }),
		).resolves.toBe(321);
	});

	it("세션 번호를 받지 못하면 단체 인증을 시작하지 않는다", async () => {
		mockApi
			.onPost("/certification/session")
			.reply(200, { isSuccess: false, result: {} });

		await expect(
			createGroupCertificationSession({ people: 4, storeId: 7, adminId: 10 }),
		).rejects.toThrow("그룹 인증 세션을 만들지 못했습니다.");
	});
});
