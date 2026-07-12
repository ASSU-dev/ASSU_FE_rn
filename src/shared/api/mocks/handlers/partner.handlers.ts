import type MockAdapter from "axios-mock-adapter";
import type {
	BaseResponse,
	PartnerRecommendResponseDTO,
} from "@/entities/partnership";

const mockPartnerAdminRecommend: PartnerRecommendResponseDTO = {
	admins: [
		{
			adminId: 1,
			adminName: "숭실대학교\n경영학부 학생회",
			adminAddress: "서울 동작구 상도로 369",
			adminDetailAddress: "숭실대학교 학생회관 101호",
			adminUrl: "https://kko.kakao.com/mock-admin-1",
			adminPhone: "02-820-0114",
		},
		{
			adminId: 2,
			adminName: "숭실대학교\n스포츠학부 학생회",
			adminAddress: "서울 동작구 상도로 369",
			adminDetailAddress: "숭실대학교 학생회관 102호",
			adminUrl: "https://kko.kakao.com/mock-admin-2",
			adminPhone: "02-820-0115",
		},
	],
};

export function registerPartnerHandlers(mock: MockAdapter) {
	mock.onGet("/partner/admin-recommend").reply(200, {
		isSuccess: true,
		code: "COMMON200",
		message: "OK",
		result: mockPartnerAdminRecommend,
	} satisfies BaseResponse<PartnerRecommendResponseDTO>);
}
