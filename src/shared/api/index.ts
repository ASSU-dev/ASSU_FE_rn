import "./interceptors";

export type { ApiError, ApiResponse } from "@/shared/types/api";
export type {
	BaseResponseNotificationSettingsResponseDTO,
	NotificationSettingsResponseDTO,
	NotificationSettingsResponseDTOSettings,
} from "./_generated/auth/getSettings";
// getSettings
export { getAssuApi as getGetSettingsApi } from "./_generated/auth/getSettings";
export type {
	BaseResponseLoginResponseDTO,
	LoginResponseDTO,
} from "./_generated/auth/loginStudent";
// loginStudent
export {
	getAssuApi as getLoginStudentApi,
	LoginResponseDTORole,
	LoginResponseDTOStatus,
} from "./_generated/auth/loginStudent";
export type {
	BaseResponseRefreshResponseDTO,
	RefreshResponseDTO,
} from "./_generated/auth/refreshToken";
// refreshToken
export { getAssuApi as getRefreshTokenApi } from "./_generated/auth/refreshToken";
export type {
	BaseResponseSignUpResponseDTO,
	SignUpResponseDTO,
	StudentTokenAuthPayloadDTO,
	StudentTokenSignUpRequestDTO,
	TokensDTO,
	UserBasicInfoDTO,
} from "./_generated/auth/signupStudent";
// signupStudent
export {
	getAssuApi as getSignupStudentApi,
	StudentTokenAuthPayloadDTOUniversity,
} from "./_generated/auth/signupStudent";
export type {
	BaseResponseUSaintAuthResponseDTO,
	USaintAuthRequestDTO,
	USaintAuthResponseDTO,
} from "./_generated/auth/ssuAuth";
// ssuAuth
export { getAssuApi as getSsuAuthApi } from "./_generated/auth/ssuAuth";
// toggle
export { getAssuApi as getToggleApi } from "./_generated/auth/toggle";
export { apiInstance } from "./instance";
export type { BaseResponse } from "./types";
