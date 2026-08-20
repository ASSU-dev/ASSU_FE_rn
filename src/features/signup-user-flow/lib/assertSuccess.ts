/** 응답의 result를 이어서 사용하는 요청용. result가 비어 있으면 실패로 본다 */
export function assertSuccess<R>(
	response: { isSuccess?: boolean; result?: R; message?: string },
	fallback: string,
): asserts response is {
	isSuccess: true;
	result: NonNullable<R>;
	message?: string;
} {
	if (!response.isSuccess || response.result == null) {
		throw new Error(response.message ?? fallback);
	}
}

/**
 * 성공 여부만 확인하는 요청용. result를 쓰지 않을 때 사용한다.
 *
 * 회원가입은 백오피스 승인 전까지 JWT가 발급되지 않아 응답 본문이 비어 올 수 있는데,
 * 그 경우에도 가입 자체는 성공이므로 result 유무로 실패를 판정하면 안 된다.
 * HTTP 상태 코드로 걸러지지 않는 실패만 여기서 잡는다.
 */
export function assertRequestSucceeded(
	response: { isSuccess?: boolean; message?: string },
	fallback: string,
) {
	if (response.isSuccess === false) {
		throw new Error(response.message ?? fallback);
	}
}
