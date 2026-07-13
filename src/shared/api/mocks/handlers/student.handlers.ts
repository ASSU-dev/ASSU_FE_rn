import type MockAdapter from "axios-mock-adapter";

export function registerStudentHandlers(mock: MockAdapter) {
	mock.onGet("/suggestion/admin").reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "성공",
		result: {
			adminId: 1,
			adminName: "숭실대학교 총학생회",
			departId: 2,
			departName: "IT대학 학생회",
			majorId: 3,
			majorName: "컴퓨터학부 학생회",
		},
	});

	mock.onPost("/suggestion").reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "성공",
		result: {
			suggestionId: 1,
			userId: 10,
			adminId: 1,
			storeName: "스타벅스 숭실대점",
			suggestionBenefit: "아메리카노 10% 할인",
		},
	});

	mock.onGet(/\/students\/partnerships\/\d+\/\d+/).reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "성공",
		result: {
			serviceCount: 3,
			details: [
				{
					partnershipUsageId: 1,
					storeName: "인쌩맥주 숭실대점",
					storeId: 101,
					partnerId: 201,
					adminName: "홍길동",
					usedAt: "2025-05-15T18:36:00",
					benefitDescription: "음료 한병을 제공받았어요!",
					isReviewed: false,
				},
				{
					partnershipUsageId: 2,
					storeName: "스타벅스 숭실대입구점",
					storeId: 102,
					partnerId: 202,
					adminName: "김철수",
					usedAt: "2025-05-10T14:20:00",
					benefitDescription: "아메리카노 1잔을 제공받았어요!",
					isReviewed: true,
				},
				{
					partnershipUsageId: 3,
					storeName: "맥도날드 숭실대점",
					storeId: 103,
					partnerId: 203,
					adminName: "이영희",
					usedAt: "2025-05-08T12:00:00",
					benefitDescription: "맥버거 세트를 제공받았어요!",
					isReviewed: false,
				},
			],
		},
	});
}
