import "./interceptors";

export type { ApiError, ApiResponse } from "@/shared/types/api";
export type {
	BaseResponseBlockMemberDTO,
	BlockMemberDTO,
	BlockMemberRequestDTO,
} from "./_generated/auth/block";
// block
export { getAssuApi as getBlockApi } from "./_generated/auth/block";
export type {
	BaseResponseCheckBlockMemberDTO,
	CheckBlockMemberDTO,
} from "./_generated/auth/checkBlock";
// checkBlock
export { getAssuApi as getCheckBlockApi } from "./_generated/auth/checkBlock";
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
	BaseResponseLeaveChattingRoomResponseDTO,
	LeaveChattingRoomResponseDTO,
} from "./_generated/auth/leaveChattingRoom";
// leaveChattingRoom
export { getAssuApi as getLeaveChattingRoomApi } from "./_generated/auth/leaveChattingRoom";
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
