import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/instance";
import type { BaseResponse, CheckStampResponseDTO } from "../model/types";

export const studentStampQueryKey = ["student", "stamp"] as const;

async function fetchStudentStamp(): Promise<CheckStampResponseDTO | null> {
	const response =
		await apiInstance.get<BaseResponse<CheckStampResponseDTO>>(
			"/students/stamp",
		);

	return response.data.result ?? null;
}

export function useStudentStampQuery() {
	return useQuery({
		queryKey: studentStampQueryKey,
		queryFn: fetchStudentStamp,
	});
}
