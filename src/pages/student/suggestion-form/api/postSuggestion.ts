export type PostSuggestionPayload = {
	target: string;
	storeName: string;
	desiredBenefit: string;
};

// TODO: 백엔드 API 연동 시 실제 엔드포인트로 교체
export async function postSuggestion(
	_payload: PostSuggestionPayload,
): Promise<void> {}
