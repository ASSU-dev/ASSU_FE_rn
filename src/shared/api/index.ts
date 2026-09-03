import "./interceptors";

export type { ApiError, ApiResponse } from "@/shared/types/api";
export type {
	BaseResponseBlockMemberDTO,
	BlockMemberDTO,
	BlockMemberRequestDTO,
} from "./_generated/auth/block";
// block
export { getAssuApi as getBlockApi } from "./_generated/auth/block";
export type { PhoneAuthVerifyRequestDTO } from "./_generated/auth/checkAuthNumber";
// checkAuthNumber
export { getAssuApi as getCheckAuthNumberApi } from "./_generated/auth/checkAuthNumber";
export type {
	BaseResponseCheckBlockMemberDTO,
	CheckBlockMemberDTO,
} from "./_generated/auth/checkBlock";
// checkBlock
export { getAssuApi as getCheckBlockApi } from "./_generated/auth/checkBlock";
export type {
	BaseResponseVoid,
	BaseResponseVoidResult,
	EmailVerificationCheckRequestDTO,
} from "./_generated/auth/checkEmailAvailability";
// checkEmailAvailability
export { getAssuApi as getCheckEmailAvailabilityApi } from "./_generated/auth/checkEmailAvailability";
export type { PhoneAuthSendRequestDTO } from "./_generated/auth/checkPhoneAvailabilityAndSendAuthNumber";
// checkPhoneAvailabilityAndSendAuthNumber
export { getAssuApi as getCheckPhoneAvailabilityAndSendAuthNumberApi } from "./_generated/auth/checkPhoneAvailabilityAndSendAuthNumber";
export type {
	BaseResponseCreateChatRoomResponseDTO,
	CreateChatRoomRequestDTO,
	CreateChatRoomResponseDTO,
} from "./_generated/auth/createChatRoom";
// createChatRoom
export { getAssuApi as getCreateChatRoomApi } from "./_generated/auth/createChatRoom";
export type { BaseResponseListBlockMemberDTO } from "./_generated/auth/getBlockList";
// getBlockList
export { getAssuApi as getGetBlockListApi } from "./_generated/auth/getBlockList";
export type {
	BaseResponseChatHistoryResponseDTO,
	ChatHistoryResponseDTO,
	ChatMessageDTO,
} from "./_generated/auth/getChatHistory";
// getChatHistory
export {
	ChatMessageDTOMessageType,
	getAssuApi as getGetChatHistoryApi,
} from "./_generated/auth/getChatHistory";
export type {
	BaseResponseListChatRoomListResultDTO,
	ChatRoomListResultDTO,
} from "./_generated/auth/getChatRoomList";
// getChatRoomList
export { getAssuApi as getGetChatRoomListApi } from "./_generated/auth/getChatRoomList";
export type {
	BaseResponseNotificationSettingsResponseDTO,
	NotificationSettingsResponseDTO,
	NotificationSettingsResponseDTOSettings,
} from "./_generated/auth/getSettings";
// getSettings
export { getAssuApi as getGetSettingsApi } from "./_generated/auth/getSettings";
export type {
	BaseResponseLeaveChattingRoomResponseDTO,
	LeaveChattingRoomResponseDTO,
} from "./_generated/auth/leaveChattingRoom";
// leaveChattingRoom
export { getAssuApi as getLeaveChattingRoomApi } from "./_generated/auth/leaveChattingRoom";
export type {
	BaseResponsePageResponseDTOInquiryResponseDTO,
	InquiryResponseDTO,
	ListParams,
	PageResponseDTOInquiryResponseDTO,
} from "./_generated/auth/list";
// list
export { getAssuApi as getListApi, ListStatus } from "./_generated/auth/list";
export type {
	BaseResponseMapStringObject,
	List1Params,
} from "./_generated/auth/list_1";
// list_1
export { getAssuApi as getList_1Api } from "./_generated/auth/list_1";
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
export type { BaseResponseString } from "./_generated/auth/markRead";
// markRead
export { getAssuApi as getMarkReadApi } from "./_generated/auth/markRead";
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
	BaseResponseLong,
	RegisterParams,
} from "./_generated/auth/register";
// register
export { getAssuApi as getRegisterApi } from "./_generated/auth/register";
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
// toggle
export { getAssuApi as getToggleApi } from "./_generated/auth/toggle";
export type { UnblockParams } from "./_generated/auth/unblock";
// unblock
export { getAssuApi as getUnblockApi } from "./_generated/auth/unblock";
// unregister
export { getAssuApi as getUnregisterApi } from "./_generated/auth/unregister";
export type {
	BaseResponseGetStoreDetailsDTO,
	GetStoreDetailsDTO,
} from "./_generated/store/getStoreDetails";
// getStoreDetails
export { getAssuApi as getGetStoreDetailsApi } from "./_generated/store/getStoreDetails";
export type {
	BaseResponseListRecommendCarouselDTO,
	RecommendCarouselDTO,
} from "./_generated/student/getRecommendCarouselPartnership";
// getRecommendCarouselPartnership
export { getAssuApi as getGetRecommendCarouselPartnershipApi } from "./_generated/student/getRecommendCarouselPartnership";
export type {
	BaseResponseStudentHomeResponseDTO,
	CurationGroupDTO,
	CurationStoreDTO,
	FeaturedRecommendationDTO,
	StudentHomeResponseDTO,
} from "./_generated/student/getRecommendCuration";
// getRecommendCuration
export { getAssuApi as getGetRecommendCurationApi } from "./_generated/student/getRecommendCuration";
export type {
	BaseResponseListUsablePartnershipDTO,
	GetUsablePartnershipParams,
	UsablePartnershipDTO,
} from "./_generated/student/getUsablePartnership";
// getUsablePartnership
export {
	GetUsablePartnershipStoreCategory,
	getAssuApi as getGetUsablePartnershipApi,
	UsablePartnershipDTOCriterionType,
	UsablePartnershipDTOOptionType,
} from "./_generated/student/getUsablePartnership";
export { getApiErrorMessage } from "./apiErrorMessage";
export { apiInstance } from "./instance";
export type { BaseResponse } from "./types";
