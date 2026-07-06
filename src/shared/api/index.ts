import "./interceptors";

export type { ApiError, ApiResponse } from "@/shared/types/api";
export type {
	BaseResponseVoid,
	EmailVerificationCheckRequestDTO,
} from "./_generated/auth/checkEmailAvailability";
// checkEmailAvailability
export { getAssuApi as getCheckEmailAvailabilityApi } from "./_generated/auth/checkEmailAvailability";
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
	AdminSignUpRequestDTO,
	CommonAuthPayloadDTO,
	CommonInfoPayloadDTO,
	SelectedPlacePayload,
	SignupAdminBody,
} from "./_generated/auth/signupAdmin";
// signupAdmin
export {
	CommonAuthPayloadDTODepartment,
	CommonAuthPayloadDTOMajor,
	CommonAuthPayloadDTOUniversity,
	getAssuApi as getSignupAdminApi,
	SignUpResponseDTORole,
	SignUpResponseDTOStatus,
} from "./_generated/auth/signupAdmin";
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
export { apiInstance } from "./instance";
