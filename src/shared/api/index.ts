import "./interceptors";

export type { ApiError, ApiResponse } from "@/shared/types/api";
export type { CommonLoginRequestDTO } from "./_generated/auth/loginCommon";
export { getAssuApi as getLoginCommonApi } from "./_generated/auth/loginCommon";
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
	BaseResponseReadMessageResponseDTO,
	ReadMessageResponseDTO,
} from "./_generated/auth/readMessage";
// readMessage
export { getAssuApi as getReadMessageApi } from "./_generated/auth/readMessage";
export type {
	BaseResponseRefreshResponseDTO,
	RefreshResponseDTO,
} from "./_generated/auth/refreshToken";
// refreshToken
export { getAssuApi as getRefreshTokenApi } from "./_generated/auth/refreshToken";
export type {
	AdminSignUpRequestDTO,
	SignupAdminBody,
} from "./_generated/auth/signupAdmin";
// signupAdmin
export { getAssuApi as getSignupAdminApi } from "./_generated/auth/signupAdmin";
export type {
	CommonAuthPayloadDTO,
	CommonInfoPayloadDTO,
	PartnerSignUpRequestDTO,
	SelectedPlacePayload,
	SignupPartnerBody,
} from "./_generated/auth/signupPartner";
// signupPartner
export {
	CommonAuthPayloadDTODepartment,
	CommonAuthPayloadDTOMajor,
	CommonAuthPayloadDTOUniversity,
	getAssuApi as getSignupPartnerApi,
	SignUpResponseDTORole,
	SignUpResponseDTOStatus,
} from "./_generated/auth/signupPartner";
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
export type { UnblockParams } from "./_generated/auth/unblock";
// unblock
export { getAssuApi as getUnblockApi } from "./_generated/auth/unblock";
export { apiInstance } from "./instance";
export type { BaseResponse } from "./types";
