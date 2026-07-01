import type MockAdapter from "axios-mock-adapter";
import type {
	AdminRecommendResponseDTO,
	BaseResponse,
} from "@/entities/partnership";

const mockAdminPartnerRecommend: AdminRecommendResponseDTO = {
	partnerId: 1,
	partnerName: "역전할머니맥주 숭실대점",
	partnerAddress: "서울 동작구 사당로 36-1",
	partnerDetailAddress: "서정캐슬",
	partnerUrl: "https://kko.kakao.com/mock-partner-url",
	partnerPhone: "02-123-4567",
};

export function registerAdminHandlers(mock: MockAdapter) {
	mock.onGet("/admin/partner-recommend").reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "OK",
		result: mockAdminPartnerRecommend,
	} satisfies BaseResponse<AdminRecommendResponseDTO>);
}
