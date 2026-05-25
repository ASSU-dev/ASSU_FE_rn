export interface BaseResponse<T> {
	isSuccess: boolean;
	code: string;
	message: string;
	result: T;
}

/** GET /suggestion/admin */
export interface GetSuggestionAdminsDto {
	adminId: number;
	adminName: string;
	departId: number;
	departName: string;
	majorId: number;
	majorName: string;
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
