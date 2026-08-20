export interface BaseResponse<T> {
	isSuccess: boolean;
	code: string;
	message: string;
	result: T;
}

/**
 * GET /suggestion/admin
 * - 학생 소속에 따라 단과대/학과 학생회가 없을 수 있어 해당 필드는 null로 내려온다.
 */
export interface GetSuggestionAdminsDto {
	adminId: number;
	adminName: string;
	departId: number | null;
	departName: string | null;
	majorId: number | null;
	majorName: string | null;
}

/** POST /suggestion — 요청 */
export interface WriteSuggestionRequestDto {
	adminId: number;
	storeName: string;
	benefit: string;
}

/** POST /suggestion — 응답 */
export interface WriteSuggestionResponseDto {
	suggestionId: number;
	userId: number;
	adminId: number;
	storeName: string;
	suggestionBenefit: string;
}
