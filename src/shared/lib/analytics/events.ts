// 제휴 혜택 이용 퍼널 GA 이벤트 명세 (Notion "GA 설계" 기준).
// 이벤트명·파라미터를 바꿀 때는 설계서와 함께 갱신한다.

export type EntryPoint = "store_detail" | "map_card" | "scanner_button";

// 매장을 식별한 방법. 매장 상세·지도에서 바로 시작하면 "direct".
export type AuthMethod = "qr" | "number" | "direct";

export type BenefitType = "individual" | "group";

export type FailStage =
	| "qr_scan"
	| "benefit_load"
	| "benefit_certify"
	| "usage_record"
	| "group_participant"
	| "group_session";

export type FailReason =
	| "invalid_qr"
	| "request_failed"
	| "session_lookup_failed"
	| "connection_failed"
	| "not_eligible"
	| "session_expired";

type PartnershipStartedParams = {
	entry_point: EntryPoint;
	store_id?: number;
};

type AuthMethodSelectedParams = {
	auth_method: "qr" | "number";
};

type BenefitSelectedParams = {
	store_id: number;
	content_id: number;
	benefit_type: BenefitType;
	preselected: 0 | 1;
	auth_method: AuthMethod;
};

type PartnershipAuthSucceededParams = {
	store_id: number;
	content_id: number;
	benefit_type: BenefitType;
	auth_method: AuthMethod;
};

type PartnershipAuthFailedParams = {
	fail_stage: FailStage;
	fail_reason: FailReason;
	store_id?: number;
	auth_method?: AuthMethod;
};

// 단체 혜택일 때만 인원 구성을 함께 보낸다. group_unverified는 확인 화면의 "N명 검증 필요"와 같은 값이다.
type PartnershipUsageCompletedParams = {
	store_id: number;
	content_id: number;
	benefit_type: BenefitType;
	auth_method: AuthMethod;
	group_size?: number;
	group_app_verified?: number;
	group_unverified?: number;
};

type GroupParticipantVerifiedParams = {
	store_id?: number;
	content_id: number;
	group_size: number;
};

export type AnalyticsEventMap = {
	partnership_started: PartnershipStartedParams;
	auth_method_selected: AuthMethodSelectedParams;
	benefit_selected: BenefitSelectedParams;
	partnership_auth_succeeded: PartnershipAuthSucceededParams;
	partnership_auth_failed: PartnershipAuthFailedParams;
	partnership_usage_completed: PartnershipUsageCompletedParams;
	group_participant_verified: GroupParticipantVerifiedParams;
};
