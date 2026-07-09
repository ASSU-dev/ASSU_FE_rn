import type MockAdapter from "axios-mock-adapter";
import type {
	BaseResponseLoginResponseDTO,
	BaseResponseSignUpResponseDTO,
} from "@/shared/api";

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

const mockPartnerLoginResponse = {
	isSuccess: true,
	code: "COMMON200",
	message: "OK",
	result: {
		memberId: 2001,
		role: "PARTNER",
		status: "ACTIVE",
		tokens: {
			accessToken: "mock-partner-login-access-token",
			refreshToken: "mock-partner-login-refresh-token",
		},
		basicInfo: {
			name: "역전할머니맥주 숭실대점",
		},
	},
} satisfies BaseResponseLoginResponseDTO;

const mockAdminLoginResponse = {
	isSuccess: true,
	code: "COMMON200",
	message: "OK",
	result: {
		memberId: 2002,
		role: "ADMIN",
		status: "ACTIVE",
		tokens: {
			accessToken: "mock-admin-login-access-token",
			refreshToken: "mock-admin-login-refresh-token",
		},
		basicInfo: {
			name: "숭실대학교 총학생회",
		},
	},
} satisfies BaseResponseLoginResponseDTO;

export function registerAuthHandlers(mock: MockAdapter) {
	mock.onPost("/auth/partners/signup").reply(200, mockPartnerSignupResponse);
	mock.onPost("/auth/commons/login").reply((config) => {
		const body =
			typeof config.data === "string"
				? (JSON.parse(config.data) as { email?: string })
				: (config.data as { email?: string });

		if (body.email?.toLowerCase().includes("admin")) {
			return [200, mockAdminLoginResponse];
		}

		return [200, mockPartnerLoginResponse];
	});
}
