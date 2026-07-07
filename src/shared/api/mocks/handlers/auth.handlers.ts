import type MockAdapter from "axios-mock-adapter";
import type { BaseResponseSignUpResponseDTO } from "@/shared/api";

const mockPartnerSignupResponse = {
	isSuccess: true,
	code: "COMMON200",
	message: "OK",
	result: {
		memberId: 1001,
		role: "PARTNER",
		status: "ACTIVE",
		tokens: {
			accessToken: "mock-partner-access-token",
			refreshToken: "mock-partner-refresh-token",
		},
		basicInfo: {
			name: "역전할머니맥주 숭실대점",
		},
	},
} satisfies BaseResponseSignUpResponseDTO;

export function registerAuthHandlers(mock: MockAdapter) {
	mock.onPost("/auth/partners/signup").reply(200, mockPartnerSignupResponse);
}
