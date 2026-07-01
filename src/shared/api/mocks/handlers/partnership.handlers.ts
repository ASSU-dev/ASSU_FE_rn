import type MockAdapter from "axios-mock-adapter";
import type {
	BaseResponse,
	PagedResponse,
	PartnershipDetailResponseDTO,
	WritePartnershipResponseDTO,
} from "@/entities/partnership";

const mockPartnerships: WritePartnershipResponseDTO[] = [
	{
		partnershipId: 1,
		storeName: "역전할머니맥주 숭실대점",
		adminName: "숭실대학교 총학생회",
		partnershipPeriodStart: "2025-03-15",
		partnershipPeriodEnd: "2025-06-15",
		adminId: 1,
		partnerId: 1,
		storeId: 1,
		isActivated: "ACTIVE",
		options: [
			{
				optionType: "SERVICE",
				criterionType: "HEADCOUNT",
				anotherType: false,
				people: 4,
				category: "음료",
				goods: [
					{ goodsId: 1, goodsName: "캔 음료" },
					{ goodsId: 2, goodsName: "생맥주 1잔" },
				],
			},
		],
	},
	{
		partnershipId: 2,
		storeName: "떠그릭 동작점",
		adminName: "숭실대학교 총학생회",
		partnershipPeriodStart: "2025-02-01",
		partnershipPeriodEnd: "2025-08-31",
		adminId: 1,
		partnerId: 2,
		storeId: 2,
		isActivated: "ACTIVE",
		options: [
			{
				optionType: "DISCOUNT",
				criterionType: "PRICE",
				anotherType: false,
				cost: 10000,
				discountRate: 10,
				goods: [{ goodsId: 3, goodsName: "전체 메뉴" }],
			},
		],
	},
	{
		partnershipId: 3,
		storeName: "카페 숭실",
		adminName: "숭실대학교 총학생회",
		partnershipPeriodStart: "2025-03-01",
		partnershipPeriodEnd: "2025-09-30",
		adminId: 1,
		partnerId: 3,
		storeId: 3,
		isActivated: "ACTIVE",
		options: [
			{
				optionType: "SERVICE",
				criterionType: "PRICE",
				anotherType: true,
				note: "아메리카노 1000원 할인",
				goods: [{ goodsId: 4, goodsName: "아메리카노" }],
			},
		],
	},
	{
		partnershipId: 4,
		storeName: "피자스쿨 숭실대점",
		adminName: "숭실대학교 경영학부 학생회",
		partnershipPeriodStart: "2024-09-01",
		partnershipPeriodEnd: "2025-02-28",
		adminId: 2,
		partnerId: 4,
		storeId: 4,
		isActivated: "INACTIVE",
		options: [
			{
				optionType: "DISCOUNT",
				criterionType: "HEADCOUNT",
				anotherType: false,
				people: 2,
				discountRate: 15,
				cost: 20000,
				goods: [{ goodsId: 5, goodsName: "피자 전 메뉴" }],
			},
		],
	},
	{
		partnershipId: 5,
		storeName: "GS25 숭실대점",
		adminName: "숭실대학교 스포츠학부 학생회",
		partnershipPeriodStart: "2025-01-01",
		partnershipPeriodEnd: "2025-12-31",
		adminId: 3,
		partnerId: 5,
		storeId: 5,
		isActivated: "SUSPEND",
		options: [
			{
				optionType: "SERVICE",
				criterionType: "PRICE",
				anotherType: false,
				cost: 5000,
				category: "간식",
				goods: [
					{ goodsId: 6, goodsName: "삼각김밥" },
					{ goodsId: 7, goodsName: "컵라면" },
				],
			},
		],
	},
];

const mockPartnershipDetails: Record<string, PartnershipDetailResponseDTO> = {
	"1": {
		partnershipId: 1,
		updatedAt: "2025-03-01T00:00:00",
		partnershipPeriodStart: "2025-03-15",
		partnershipPeriodEnd: "2025-06-15",
		adminId: 1,
		partnerId: 1,
		storeId: 1,
		options: [
			{
				optionType: "SERVICE",
				criterionType: "HEADCOUNT",
				anotherType: false,
				people: 4,
				category: "음료",
				goods: [
					{ goodsId: 1, goodsName: "캔 음료" },
					{ goodsId: 2, goodsName: "생맥주 1잔" },
				],
			},
			{
				optionType: "SERVICE",
				criterionType: "HEADCOUNT",
				anotherType: false,
				people: 6,
				category: "안주",
				goods: [{ goodsId: 3, goodsName: "안주 1개" }],
			},
		],
	},
	"2": {
		partnershipId: 2,
		updatedAt: "2025-01-25T00:00:00",
		partnershipPeriodStart: "2025-02-01",
		partnershipPeriodEnd: "2025-08-31",
		adminId: 1,
		partnerId: 2,
		storeId: 2,
		options: [
			{
				optionType: "DISCOUNT",
				criterionType: "PRICE",
				anotherType: false,
				cost: 10000,
				discountRate: 10,
				goods: [{ goodsId: 4, goodsName: "전체 메뉴" }],
			},
		],
	},
	"3": {
		partnershipId: 3,
		updatedAt: "2025-02-20T00:00:00",
		partnershipPeriodStart: "2025-03-01",
		partnershipPeriodEnd: "2025-09-30",
		adminId: 1,
		partnerId: 3,
		storeId: 3,
		options: [
			{
				optionType: "SERVICE",
				criterionType: "PRICE",
				anotherType: true,
				note: "아메리카노 1000원 할인",
				goods: [{ goodsId: 5, goodsName: "아메리카노" }],
			},
		],
	},
	"4": {
		partnershipId: 4,
		updatedAt: "2024-08-20T00:00:00",
		partnershipPeriodStart: "2024-09-01",
		partnershipPeriodEnd: "2025-02-28",
		adminId: 2,
		partnerId: 4,
		storeId: 4,
		options: [
			{
				optionType: "DISCOUNT",
				criterionType: "HEADCOUNT",
				anotherType: false,
				people: 2,
				discountRate: 15,
				cost: 20000,
				goods: [{ goodsId: 6, goodsName: "피자 전 메뉴" }],
			},
		],
	},
	"5": {
		partnershipId: 5,
		updatedAt: "2024-12-15T00:00:00",
		partnershipPeriodStart: "2025-01-01",
		partnershipPeriodEnd: "2025-12-31",
		adminId: 3,
		partnerId: 5,
		storeId: 5,
		options: [
			{
				optionType: "SERVICE",
				criterionType: "PRICE",
				anotherType: false,
				cost: 5000,
				category: "간식",
				goods: [
					{ goodsId: 7, goodsName: "삼각김밥" },
					{ goodsId: 8, goodsName: "컵라면" },
				],
			},
		],
	},
};

const pagedResponse = <T>(content: T[]): PagedResponse<T> => ({
	content,
	totalPages: 1,
	totalElements: content.length,
	size: content.length,
	number: 0,
	first: true,
	last: true,
	empty: content.length === 0,
});

export function registerPartnershipHandlers(mock: MockAdapter) {
	mock.onGet("/partnership/admin").reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "OK",
		result: pagedResponse(mockPartnerships),
	} satisfies BaseResponse<PagedResponse<WritePartnershipResponseDTO>>);

	mock.onGet("/partnership/partner").reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "OK",
		result: pagedResponse(mockPartnerships),
	} satisfies BaseResponse<PagedResponse<WritePartnershipResponseDTO>>);

	mock.onGet(/^\/partnership\/(\d+)$/).reply((config) => {
		const id = config.url?.split("/").pop() ?? "";
		const detail = mockPartnershipDetails[id];
		if (!detail) {
			return [
				404,
				{
					isSuccess: false,
					code: "NOT_FOUND",
					message: "제휴를 찾을 수 없습니다.",
					result: null,
				},
			];
		}
		return [
			200,
			{
				isSuccess: true,
				code: "COMMON200",
				message: "OK",
				result: detail,
			} satisfies BaseResponse<PartnershipDetailResponseDTO>,
		];
	});
}
