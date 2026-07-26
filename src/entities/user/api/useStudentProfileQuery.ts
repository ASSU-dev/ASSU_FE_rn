import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type { BaseResponse, StudentProfile } from "../model/types";

export const studentProfileQueryKey = ["student", "profile"] as const;

async function fetchStudentProfile(): Promise<StudentProfile> {
	const response =
		await apiInstance.get<BaseResponse<StudentProfile>>("/students/info");

	if (!response.data.result) {
		throw new Error(
			response.data.message ?? "학생 프로필 정보를 불러오지 못했습니다.",
		);
	}

	return response.data.result;
}

export function useStudentProfileQuery() {
	return useQuery({
		queryKey: studentProfileQueryKey,
		queryFn: fetchStudentProfile,
		staleTime: 1000 * 60 * 5,
	});
}
