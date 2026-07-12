import "./interceptors";

export type { ApiError, ApiResponse } from "@/shared/types/api";
export type {
	BaseResponseMapStringObject,
	List1Params,
} from "./_generated/auth/list_1";
// list_1
export { getAssuApi as getList_1Api } from "./_generated/auth/list_1";
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
export type { BaseResponseString } from "./_generated/auth/markRead";
// markRead
export { getAssuApi as getMarkReadApi } from "./_generated/auth/markRead";
export type {
	BaseResponseRefreshResponseDTO,
	RefreshResponseDTO,
} from "./_generated/auth/refreshToken";
// refreshToken
export { getAssuApi as getRefreshTokenApi } from "./_generated/auth/refreshToken";
export type {
	BaseResponseLong,
	RegisterParams,
} from "./_generated/auth/register";
// register
export { getAssuApi as getRegisterApi } from "./_generated/auth/register";
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
// unregister
export { getAssuApi as getUnregisterApi } from "./_generated/auth/unregister";
export { apiInstance } from "./instance";
