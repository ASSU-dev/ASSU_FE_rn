import axios from "axios";

/**
 * HTTP 상태 코드만으로 판단 가능한 기본 문구.
 * 서버가 BaseResponse.message를 내려주면 그쪽이 우선한다.
 */
const MESSAGE_BY_STATUS: Record<number, string> = {
	400: "입력한 정보를 다시 확인해주세요.",
	401: "인증이 필요합니다. 다시 로그인해주세요.",
	403: "접근 권한이 없습니다.",
	404: "요청한 정보를 찾을 수 없습니다.",
	409: "이미 존재하는 계정입니다.",
	500: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

/**
 * API 에러에서 사용자에게 보여줄 문구를 뽑는다.
 * 우선순위: overrides[status] → 서버 BaseResponse.message → 상태 코드별 기본 문구 → fallback
 *
 * 서버 문구가 화면에 쓰기엔 지나치게 구체적인 경우(예: 409 "이미 존재하는 학번입니다")
 * overrides로 해당 상태 코드의 문구를 덮어쓴다.
 *
 * axios 에러의 message("Request failed with status code 409")는
 * 사용자에게 노출하지 않는다.
 */
export function getApiErrorMessage(
	error: unknown,
	fallback: string,
	overrides?: Record<number, string>,
): string {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;

		if (status && overrides?.[status]) return overrides[status];

		const serverMessage = (
			error.response?.data as { message?: string } | undefined
		)?.message;
		if (serverMessage) return serverMessage;

		if (status && MESSAGE_BY_STATUS[status]) return MESSAGE_BY_STATUS[status];

		return fallback;
	}

	// assertSuccess 등 앱 내부에서 던진 에러는 메시지가 이미 사용자용 문구다
	if (error instanceof Error && error.message) return error.message;

	return fallback;
}
