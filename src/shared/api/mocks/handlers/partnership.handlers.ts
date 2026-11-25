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
				contentId: 101,
				benefitCondition: "4인 이상 방문 시",
				benefit: "캔 음료, 생맥주 1잔 제공",
				caution: null,
				minPeople: 4,
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
				contentId: 102,
				benefitCondition: "10,000원 이상 주문 시",
				benefit: "10% 할인",
				caution: null,
				minPeople: null,
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
				contentId: 103,
				benefitCondition: null,
				benefit: "아메리카노 1000원 할인",
				caution: null,
				minPeople: null,
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
				contentId: 104,
				benefitCondition: "2인 이상 방문 시 20,000원 이상 주문 시",
				benefit: "15% 할인",
				caution: null,
				minPeople: 2,
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
				contentId: 105,
				benefitCondition: "5,000원 이상 주문 시",
				benefit: "삼각김밥, 컵라면 제공",
				caution: null,
				minPeople: null,
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
				contentId: 106,
				benefitCondition: "4인 이상 방문 시",
				benefit: "캔 음료, 생맥주 1잔 제공",
				caution: null,
				minPeople: 4,
			},
			{
				contentId: 107,
				benefitCondition: "6인 이상 방문 시",
				benefit: "안주 1개 제공",
				caution: null,
				minPeople: 6,
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
				contentId: 108,
				benefitCondition: "10,000원 이상 주문 시",
				benefit: "10% 할인",
				caution: null,
				minPeople: null,
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
				contentId: 109,
				benefitCondition: null,
				benefit: "아메리카노 1000원 할인",
				caution: null,
				minPeople: null,
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
				contentId: 110,
				benefitCondition: "2인 이상 방문 시 20,000원 이상 주문 시",
				benefit: "15% 할인",
				caution: null,
				minPeople: 2,
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
				contentId: 111,
				benefitCondition: "5,000원 이상 주문 시",
				benefit: "삼각김밥, 컵라면 제공",
				caution: null,
				minPeople: null,
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
