import { isAxiosError } from "axios";
import type { BaseResponse } from "@/shared/api/types";

const STAMP_ALREADY_APPLIED_TODAY_CODE = "STAMP_ALREADY_APPLIED_TODAY";

// 제휴 사용 시 오늘 이미 스탬프가 적립된 경우(409) — 제휴 인증은 정상, 스탬프만 미적립
export function isStampAlreadyAppliedError(error: unknown): boolean {
	return (
		isAxiosError<BaseResponse<null>>(error) &&
		error.response?.status === 409 &&
		error.response.data?.code === STAMP_ALREADY_APPLIED_TODAY_CODE
	);
}
