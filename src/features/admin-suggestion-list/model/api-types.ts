export type StudentMajor = string;
export type EnrollmentStatus = "ENROLLED" | "LEAVE" | "GRADUATED";

export interface GetSuggestionResponseDto {
	suggestionId: number;
	createdAt: string;
	storeName: string;
	content: string;
	studentMajor: StudentMajor;
	enrollmentStatus: EnrollmentStatus;
}
